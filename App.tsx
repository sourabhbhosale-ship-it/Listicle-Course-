
import React, { useState } from 'react';
import { COURSE_SECTIONS } from './constants';
import { Sidebar } from './components/Sidebar';
import { ContentPanel } from './components/ContentPanel';
import { UserDetailsForm } from './components/UserDetailsForm';
import Quiz from './components/Quiz';
import { AdBlockerNotice } from './components/AdBlockerNotice';
import { HamburgerIcon } from './components/Icons';
import { Footer } from './components/Footer';
import { VoiceControl } from './components/VoiceControl';
import { quizQuestions } from './quizQuestions';

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState(COURSE_SECTIONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUserSubmitted = (name: string) => {
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName(null);
    if (activeSectionId === 'quiz') {
      setActiveSectionId(COURSE_SECTIONS[0].id);
    }
  };

  const handleSectionSelect = (id: string) => {
    setActiveSectionId(id);
    setIsSidebarOpen(false); // Close sidebar on selection in mobile
  };

  const activeSection = COURSE_SECTIONS.find(s => s.id === activeSectionId) || COURSE_SECTIONS[0];
  
  let contentToRender;

  if (activeSection.id === 'quiz') {
    contentToRender = userName 
      ? <Quiz userName={userName} /> 
      : <UserDetailsForm onSubmitted={handleUserSubmitted} />;
  } else {
    contentToRender = activeSection.content;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-300">
      <AdBlockerNotice />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          sections={COURSE_SECTIONS}
          activeSectionId={activeSectionId}
          onSectionSelect={handleSectionSelect}
          onLogout={handleLogout}
          userName={userName}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm flex-shrink-0">
            <h1 className="text-lg font-bold text-white tracking-tight">
              {activeSection.title}
            </h1>
            <button onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <HamburgerIcon className="w-6 h-6 text-white" />
            </button>
          </header>
          <main className="flex-1 overflow-y-auto bg-slate-900 scroll-smooth">
            <div className="min-h-full flex flex-col p-6 md:p-10 lg:p-12">
              <div className="flex-1">
                <ContentPanel key={activeSection.id} section={{...activeSection, content: contentToRender }} />
              </div>
              <Footer />
            </div>
          </main>
        </div>
      </div>
      <VoiceControl 
        sections={COURSE_SECTIONS}
        quizQuestions={quizQuestions}
        activeSectionId={activeSectionId}
        onSectionSelect={handleSectionSelect}
      />
    </div>
  );
}

export default App;