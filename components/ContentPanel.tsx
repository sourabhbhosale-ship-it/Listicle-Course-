
import React from 'react';
import { CourseSection } from '../types';

interface ContentPanelProps {
  section: CourseSection;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({ section }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {section.content}
    </div>
  );
};

// Add fade-in animation to tailwind config or a global style
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
