import React, { useState, useEffect } from 'react';
import { InformationCircleIcon, XMarkIcon } from './Icons';

export const AdBlockerNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the notice has been dismissed previously
    try {
      const dismissed = localStorage.getItem('adBlockerNoticeDismissed');
      if (dismissed !== 'true') {
        setIsVisible(true);
      }
    } catch (e) {
      // If localStorage is unavailable, show the notice by default
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('adBlockerNoticeDismissed', 'true');
    } catch (e) {
      console.error('Failed to save dismissal state to localStorage');
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-amber-500/10 backdrop-blur-sm border-b border-amber-500/20 p-3 text-amber-300 animate-fade-in-down">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <InformationCircleIcon className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Heads up!</span> Some browser extensions (like ad-blockers) can interfere with saving your progress. For the best experience, please consider disabling them for this site.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notice"
          className="p-1 rounded-full text-amber-400 hover:bg-amber-500/20 transition-colors flex-shrink-0"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Add fade-in-down animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down {
    animation: fadeInDown 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);