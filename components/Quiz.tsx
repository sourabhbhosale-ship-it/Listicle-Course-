
import React, { useState, useMemo } from 'react';
import { quizQuestions } from '../quizQuestions';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import { Certificate } from './Certificate';

const SectionTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => <h2 className="text-4xl font-bold text-white mb-4 mt-8 pb-2 border-b-2 border-slate-700">{children}</h2>;

interface QuizProps {
  userName: string;
}

const Quiz: React.FC<QuizProps> = ({ userName }) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const score = useMemo(() => {
    return quizQuestions.reduce((total, question) => {
      return answers[question.id] === question.correctAnswer ? total + 1 : total;
    }, 0);
  }, [answers]);
  
  const getPerformanceFeedback = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) {
      return { grade: "Expert", description: "Outstanding! You have a masterful understanding of modern listicle SEO.", color: "text-green-400" };
    }
    if (percentage >= 75) {
      return { grade: "Pass", description: "Excellent work! You have a strong grasp of the key concepts and have passed the course.", color: "text-cyan-400" };
    }
    return { grade: "Fail", description: "This is a great starting point. Revisit the course materials and retake the test to earn your certificate.", color: "text-red-400" };
  };

  const hasPassed = useMemo(() => {
    if (!isSubmitted) return false;
    const feedback = getPerformanceFeedback();
    return feedback.grade === 'Pass' || feedback.grade === 'Expert';
  }, [isSubmitted, score]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (activeQuestionIndex < quizQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setActiveQuestionIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setShowReview(false);
  };

  if (isSubmitted) {
    const feedback = getPerformanceFeedback();
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="p-8 bg-slate-800/50 rounded-lg">
        <SectionTitle>Quiz Results</SectionTitle>
        <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-slate-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                    <circle
                    className={feedback.color}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={(2 * Math.PI * 42) * (1 - percentage / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="42"
                    cx="50"
                    cy="50"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-out' }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className={`text-5xl font-bold ${feedback.color}`}>{score}</span>
                    <span className="text-xl text-slate-400">/ {quizQuestions.length}</span>
                </div>
            </div>

            <p className="text-lg text-slate-400 mb-2">Your Grade</p>
            <h3 className={`text-5xl font-bold ${feedback.color}`}>{feedback.grade}</h3>
            <p className="text-slate-300 mt-4 mb-8 max-w-md mx-auto">{feedback.description}</p>
            <div className="flex justify-center gap-4">
            <button onClick={handleRetake} className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-500 transition-colors">
                Retake Quiz
            </button>
            <button onClick={() => setShowReview(!showReview)} className="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors">
                {showReview ? 'Hide' : 'Review'} Answers
            </button>
            </div>
        </div>

        {hasPassed && (
            <div className="mt-12">
                <h3 className="text-3xl font-bold text-center text-white mb-6">Your Certificate of Completion</h3>
                <Certificate userName={userName} courseName="Next-Gen Listicle Writing" completionDate={new Date()} />
            </div>
        )}
        
        {showReview && (
           <div className="mt-10 text-left space-y-6">
             <h3 className="text-2xl font-bold text-white text-center">Answer Review</h3>
             {quizQuestions.map((q) => {
                 const userAnswer = answers[q.id];
                 const isCorrect = userAnswer === q.correctAnswer;
                 return (
                     <div key={q.id} className="p-4 border border-slate-700 bg-slate-900/50 rounded-lg">
                        <p className="font-semibold text-white">{q.id}. {q.question}</p>
                        <p className={`mt-2 flex items-center gap-2 text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                           {isCorrect ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
                           Your answer: <span className="font-mono bg-slate-800 px-2 py-1 rounded">{userAnswer || 'Not Answered'}</span>
                        </p>
                        {!isCorrect && (
                           <p className="mt-1 flex items-center gap-2 text-sm text-green-400">
                             <CheckCircleIcon className="w-5 h-5" />
                             Correct answer: <span className="font-mono bg-slate-800 px-2 py-1 rounded">{q.correctAnswer}</span>
                           </p>
                        )}
                        <p className="mt-3 text-sm text-slate-400 border-t border-slate-700 pt-3"><span className="font-semibold text-slate-300">Explanation:</span> {q.explanation}</p>
                     </div>
                 );
             })}
           </div>
        )}
      </div>
    );
  }

  const currentQuestion = quizQuestions[activeQuestionIndex];
  const progress = ((activeQuestionIndex) / quizQuestions.length) * 100;

  return (
    <div>
      <SectionTitle>Test Your Knowledge</SectionTitle>
      <div className="bg-slate-800/50 p-6 md:p-8 rounded-lg shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-white">Question {activeQuestionIndex + 1} <span className="text-slate-400">of {quizQuestions.length}</span></h3>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="min-h-[100px] mb-8">
            <p className="text-xl leading-relaxed text-slate-200">{currentQuestion.question}</p>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(currentQuestion.id, option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${answers[currentQuestion.id] === option 
                  ? 'bg-cyan-500/20 border-cyan-500 text-white' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 text-slate-300'}`
              }
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-8 border-t border-slate-700 pt-6">
          <button 
            onClick={handlePrevious} 
            disabled={activeQuestionIndex === 0}
            className="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {activeQuestionIndex < quizQuestions.length - 1 ? (
             <button 
                onClick={handleNext}
                className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-500 transition-colors"
             >
                Next
             </button>
          ) : (
             <button
                onClick={handleSubmit}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors"
             >
                Submit Answers
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
