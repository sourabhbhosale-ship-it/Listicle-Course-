
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, FunctionDeclaration, LiveSession, LiveServerMessage, Modality, Type, Blob } from '@google/genai';
import { MicrophoneIcon, SearchIcon } from './Icons';
import { CourseSection } from '../types';
import { QuizQuestion } from '../quizQuestions';

// Type definitions for the Web Speech API
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}
interface SpeechRecognitionAlternative {
  transcript: string;
}
interface SpeechRecognitionErrorEvent {
  error: string;
}
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

// Audio helper functions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// Add pulsating animation for listening state
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
  .animate-pulse-voice { animation: pulse 2s infinite ease-in-out; }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  .fade-out { animation: fadeOut 0.5s ease-out forwards; }
`;
document.head.appendChild(style);

const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

interface VoiceControlProps {
  sections: CourseSection[];
  quizQuestions: QuizQuestion[];
  activeSectionId: string;
  onSectionSelect: (id: string) => void;
}

type VoiceState = 'initializing' | 'permission_needed' | 'standby' | 'listening' | 'error' | 'unsupported' | 'disabled';

interface WebSource {
  title: string;
  uri: string;
}

export const VoiceControl: React.FC<VoiceControlProps> = (props) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('initializing');
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  const [transcript, setTranscript] = useState('');
  const [sources, setSources] = useState<WebSource[]>([]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioSourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const nextStartTimeRef = useRef(0);
  const isMountedRef = useRef(true);
  const currentTranscriptRef = useRef('');
  
  const propsRef = useRef(props);
  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  const startConversationRef = useRef<() => Promise<void>>();
  const startWakeWordListenerRef = useRef<() => Promise<void>>();
  const stopWakeWordListenerRef = useRef<() => Promise<void>>();
  const requestPermissionAndStartRef = useRef<() => Promise<void>>();

  const stopConversation = useCallback(async () => {
    audioSourcesRef.current.forEach(source => source.stop());
    audioSourcesRef.current.clear();

    scriptProcessorRef.current?.disconnect();
    scriptProcessorRef.current = null;
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        await inputAudioContextRef.current.close().catch(console.error);
    }
    inputAudioContextRef.current = null;

    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;
    
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current.catch(() => null);
        session?.close();
        sessionPromiseRef.current = null;
    }
    setTranscript('');
    setSources([]);
    currentTranscriptRef.current = '';
  }, []);

  const stopWakeWordListener = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
        if (recognitionRef.current) {
            const rec = recognitionRef.current;
            recognitionRef.current = null; // Prevent re-use or race conditions

            const timer = setTimeout(() => {
                console.warn('SpeechRecognition stop() timed out.');
                rec.onend = null;
                rec.onerror = null;
                resolve();
            }, 500);

            rec.onend = () => { clearTimeout(timer); resolve(); };
            rec.onerror = () => { clearTimeout(timer); resolve(); };

            try { rec.stop(); } 
            catch (e) {
                console.error("Error stopping recognition:", e);
                clearTimeout(timer);
                resolve();
            }
        } else {
            resolve();
        }
    });
  }, []);

  const startConversation = useCallback(async () => {
    if (!isMountedRef.current || voiceState === 'listening') return;
    
    await stopWakeWordListener();
    if (!isMountedRef.current) return;

    setVoiceState('listening');
    setStatusMessage('Listening...');
    setTranscript('');
    setSources([]);
    currentTranscriptRef.current = '';
    
    // Play activation sound for immediate feedback
    if (outputAudioContextRef.current) {
        const outputCtx = outputAudioContextRef.current;
        if (outputCtx.state === 'suspended') await outputCtx.resume();
        const oscillator = outputCtx.createOscillator();
        const gainNode = outputCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(outputCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, outputCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, outputCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, outputCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, outputCtx.currentTime + 0.2);
        oscillator.start(outputCtx.currentTime);
        oscillator.stop(outputCtx.currentTime + 0.2);
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isMountedRef.current) { stream.getTracks().forEach(track => track.stop()); return; }
      mediaStreamRef.current = stream;
    } catch (error) {
      console.error('Mic permission error during conversation start:', error);
      if (isMountedRef.current) {
          setVoiceState('permission_needed');
          setStatusMessage('Mic permission error.');
          startWakeWordListenerRef.current?.();
      }
      return;
    }
      
    try {
      const { sections, quizQuestions } = propsRef.current;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sectionTitles = sections.map(s => `"${s.title}"`).join(', ');
      const sectionSummaries = sections.map(s => `- ${s.title}: Teaches about ${s.title.toLowerCase()}.`).join('\n');
      
      const systemInstruction = `You are Sara, a friendly and helpful voice assistant for a course on listicle writing. Your name is Sara. Keep your responses concise and cheerful. When you execute a command successfully, confirm it with a short, friendly message like "Done!" or "Navigating now!". If a command fails, say so briefly.

You have been trained on the course content. Here is a summary:
- The course was created by Aditya & Sourabh Bhosale.
- The course teaches modern, semantic SEO for writing high-performing listicles.
- There are ${sections.length} sections in total. The section titles are: ${sectionTitles}.
- Here is a summary of the sections:\n${sectionSummaries}
- The final test has ${quizQuestions.length} questions.
- A passing grade is 75% or higher. A score of 90% or higher is considered 'Expert'.

Use this information to answer user questions about the course. You can also navigate the course and scroll the page.
You also have access to Google Search. If the user asks for current news, recent updates, or information not in the course, use Google Search to find the answer and summarize it concisely.`;

      const navigateToSectionDeclaration: FunctionDeclaration = { name: 'navigateToSection', parameters: { type: Type.OBJECT, description: `Navigates to a course section. Available sections: ${sectionTitles}.`, properties: { sectionTitle: { type: Type.STRING } }, required: ['sectionTitle'], }, };
      const scrollPageDeclaration: FunctionDeclaration = { name: 'scrollPage', parameters: { type: Type.OBJECT, properties: { direction: { type: Type.STRING, enum: ['up', 'down', 'top', 'bottom'] } }, required: ['direction'] } };
      const navigateRelativeDeclaration: FunctionDeclaration = { name: 'navigateRelative', parameters: { type: Type.OBJECT, properties: { direction: { type: Type.STRING, enum: ['next', 'previous'] } }, required: ['direction'] } };

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            if (!mediaStreamRef.current) return;
            const context = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            inputAudioContextRef.current = context;
            const source = context.createMediaStreamSource(mediaStreamRef.current);
            const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromiseRef.current?.then((session) => session.sendRealtimeInput({ media: pcmBlob })).catch(() => {});
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(context.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current && outputAudioContextRef.current.state === 'running') {
              const outputCtx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => audioSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              audioSourcesRef.current.add(source);
            }
            
            if (message.serverContent?.inputTranscription?.text) {
                currentTranscriptRef.current += message.serverContent.inputTranscription.text;
                setTranscript(currentTranscriptRef.current);
            }

            // Handle Grounding Metadata (Search Results)
            const groundingMetadata = message.serverContent?.modelTurn?.groundingMetadata as any;
            if (groundingMetadata?.groundingChunks) {
                const newSources = groundingMetadata.groundingChunks
                    .map((chunk: any) => chunk.web?.uri ? { title: chunk.web.title, uri: chunk.web.uri } : null)
                    .filter(Boolean);
                if (newSources.length > 0) {
                    setSources(newSources);
                }
            }
            
            if (message.serverContent?.turnComplete) {
                currentTranscriptRef.current = '';
                // Clear sources after a delay or keep them until next turn? 
                // Keeping them until next turn is better for readability.
                // We will clear them at the start of user input or new response via onmessage logic if needed, 
                // but for now, let's clear transcript and keep sources visible until closed or new sources arrive.
                setTimeout(() => setTranscript(''), 3000);
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                const currentProps = propsRef.current;
                let result = "OK";
                
                if (fc.name === 'navigateToSection' && fc.args.sectionTitle) {
                  const targetTitle = fc.args.sectionTitle.toLowerCase().trim().replace(/"/g, '');
                  const foundSection = currentProps.sections.find(s => s.title.toLowerCase().includes(targetTitle));
                  if (foundSection) currentProps.onSectionSelect(foundSection.id); else result = "Could not find that section.";
                } else if (fc.name === 'navigateRelative' && fc.args.direction) {
                  const currentIndex = currentProps.sections.findIndex(s => s.id === currentProps.activeSectionId);
                  if (fc.args.direction === 'next' && currentIndex < currentProps.sections.length - 1) currentProps.onSectionSelect(currentProps.sections[currentIndex + 1].id);
                  else if (fc.args.direction === 'previous' && currentIndex > 0) currentProps.onSectionSelect(currentProps.sections[currentIndex - 1].id);
                  else result = `I can't go ${fc.args.direction}.`;
                } else if (fc.name === 'scrollPage' && fc.args.direction) {
                  const mainContent = document.querySelector('main');
                  if (mainContent) {
                    if (fc.args.direction === 'down') mainContent.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                    if (fc.args.direction === 'up') mainContent.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
                    if (fc.args.direction === 'top') mainContent.scrollTo({ top: 0, behavior: 'smooth' });
                    if (fc.args.direction === 'bottom') mainContent.scrollTo({ top: mainContent.scrollHeight, behavior: 'smooth' });
                  }
                } else { result = "Command not recognized." }

                sessionPromiseRef.current?.then((session) => session.sendToolResponse({ functionResponses: { id: fc.id, name: fc.name, response: { result } } }));
              }
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Voice control error:', e);
            if (isMountedRef.current) {
              setStatusMessage('Connection blocked.');
              setVoiceState('error');
              startWakeWordListenerRef.current?.();
            }
          },
          onclose: () => {
            if (isMountedRef.current) {
              startWakeWordListenerRef.current?.();
            }
          },
        },
        config: { 
            systemInstruction, 
            responseModalities: [Modality.AUDIO], 
            inputAudioTranscription: {},
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
            },
            tools: [
                { functionDeclarations: [navigateToSectionDeclaration, navigateRelativeDeclaration, scrollPageDeclaration] },
                { googleSearch: {} }
            ], 
        },
      });

      sessionPromiseRef.current = sessionPromise;

      sessionPromise.catch((err) => {
        console.error("Session initialization failed:", err);
        if (isMountedRef.current) {
            setStatusMessage('Connection failed');
            setVoiceState('error');
            startWakeWordListenerRef.current?.();
        }
      });

    } catch (error) {
      console.error('Failed to start listening session:', error);
      if (isMountedRef.current) {
        setStatusMessage('Could not start session.');
        setVoiceState('error');
        startWakeWordListenerRef.current?.();
      }
    }
  }, [stopWakeWordListener, voiceState]);

  const startWakeWordListener = useCallback(async () => {
    if (!isMountedRef.current) return;

    await stopConversation();
    await stopWakeWordListener();

    if (!isMountedRef.current || !SpeechRecognitionAPI) return;
    
    setVoiceState('standby');
    setStatusMessage("Say 'Hey Sara' to start");
    
    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcriptStr = Array.from(event.results).map(r => r[0]).map(r => r.transcript).join('').toLowerCase();
        if (transcriptStr.includes('hey sara')) {
            setTranscript("Hey Sara!"); // Visual feedback
            startConversationRef.current?.();
        }
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (!isMountedRef.current) return;
        console.error('Wake word engine error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setVoiceState('permission_needed');
            setStatusMessage('Mic permission denied. Please enable it in browser settings.');
        } else if (event.error === 'audio-capture') {
            setVoiceState('error');
            setStatusMessage('No microphone found or it is in use.');
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
            setVoiceState('error');
            setStatusMessage('Mic error. Please refresh.');
        }
    };

    recognition.onend = () => {
        if (isMountedRef.current && recognitionRef.current === recognition && voiceState === 'standby') {
            try { recognition.start(); } 
            catch (e) { console.error("Error restarting recognition:", e); }
        }
    };
    
    try {
        recognition.start();
    } catch(e) {
        console.error("Could not start speech recognition:", e);
        if (isMountedRef.current) {
            setVoiceState('error');
            setStatusMessage("Couldn't start mic.");
        }
    }
  }, [stopConversation, stopWakeWordListener, voiceState]);

  const requestPermissionAndStart = useCallback(async () => {
      if (!isMountedRef.current) return;
      setVoiceState('initializing');
      setStatusMessage('Requesting permission...');
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          if (isMountedRef.current) {
              await startWakeWordListener();
          }
      } catch (error: any) {
          console.error('Initial mic permission error:', error.name, error.message);
          if (isMountedRef.current) {
              if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                  setVoiceState('permission_needed');
                  setStatusMessage('Permission denied. Click to try again.');
              } else if (error.name === 'NotFoundError') {
                  setVoiceState('error');
                  setStatusMessage('No microphone found.');
              } else {
                  setVoiceState('error');
                  setStatusMessage('Mic access error.');
              }
          }
      }
  }, [startWakeWordListener]);

  useEffect(() => {
      startConversationRef.current = startConversation;
      startWakeWordListenerRef.current = startWakeWordListener;
      stopWakeWordListenerRef.current = stopWakeWordListener;
      requestPermissionAndStartRef.current = requestPermissionAndStart;
  }, [startConversation, startWakeWordListener, stopWakeWordListener, requestPermissionAndStart]);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (!SpeechRecognitionAPI) {
        setVoiceState('unsupported');
        setStatusMessage('Voice not supported.');
    } else {
        setVoiceState('permission_needed');
        setStatusMessage('Click to enable voice control');
    }

    return () => {
      isMountedRef.current = false;
      stopConversation();
      stopWakeWordListener();
      if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close().catch(console.error);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getButtonClass = () => {
    switch(voiceState) {
        case 'standby': return 'bg-yellow-500/80 text-white';
        case 'listening': return 'bg-cyan-500 text-white animate-pulse-voice ring-4 ring-cyan-500/30';
        case 'error':
        case 'permission_needed': return 'bg-red-500 text-white';
        case 'disabled': return 'bg-slate-700 text-slate-300 hover:bg-slate-600';
        default: return 'bg-slate-700 text-slate-300';
    }
  }

  const handleButtonClick = async () => {
    // Unlock audio context on first user interaction.
    if (!outputAudioContextRef.current || outputAudioContextRef.current.state === 'closed') {
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (outputAudioContextRef.current?.state === 'suspended') {
        await outputAudioContextRef.current.resume();
    }

    if (voiceState === 'permission_needed' || voiceState === 'error' || voiceState === 'disabled') {
      await requestPermissionAndStartRef.current?.();
    } else if (voiceState === 'standby') {
      setVoiceState('disabled');
      setStatusMessage('Voice disabled. Click to enable.');
      await stopWakeWordListenerRef.current?.();
    } else if (voiceState === 'listening') {
      await startWakeWordListenerRef.current?.(); // Cancel listening and go back to standby
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Sources Card */}
        {sources.length > 0 && (
            <div className="bg-slate-800/95 backdrop-blur border border-cyan-500/30 text-slate-300 text-xs rounded-xl p-3 shadow-2xl w-64 mb-2 animate-fade-in origin-bottom-right">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-1">
                    <SearchIcon className="w-3 h-3 text-cyan-400" />
                    <span className="font-semibold text-cyan-400">Sources Found</span>
                </div>
                <ul className="space-y-2 max-h-32 overflow-y-auto">
                    {sources.map((source, i) => (
                        <li key={i}>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:underline truncate block">
                                {source.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* Transcription Bubble */}
        {(transcript) && (
             <div className="bg-slate-800/90 backdrop-blur border border-slate-700 text-white text-sm rounded-xl p-4 shadow-2xl max-w-[250px] animate-fade-in mb-2 origin-bottom-right">
                 <p>{transcript}</p>
             </div>
        )}
        
        <div className="flex items-center gap-3">
            <p className={`bg-slate-900/80 backdrop-blur-sm text-white text-xs rounded-full px-4 py-2 transition-all duration-300 shadow-lg ${voiceState !== 'initializing' && !transcript ? 'opacity-100' : 'opacity-0'}`}>
                {statusMessage}
            </p>
            <button
                onClick={handleButtonClick}
                aria-label="Voice Control"
                disabled={voiceState === 'initializing' || voiceState === 'unsupported'}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${getButtonClass()}`}
            >
                <MicrophoneIcon className="w-6 h-6" />
            </button>
        </div>
    </div>
  );
};
