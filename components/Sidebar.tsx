
import React from 'react';
import { CourseSection } from '../types';
import { XMarkIcon } from './Icons';

interface SidebarProps {
  sections: CourseSection[];
  activeSectionId: string;
  onSectionSelect: (id: string) => void;
  onLogout: () => void;
  userName?: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSectionSelect, onLogout, userName, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/70 backdrop-blur-sm border-r border-slate-800 
        flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-64 lg:w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Listicle SEO Course
            </h1>
            <p className="text-xs text-slate-500">Next-Gen Training</p>
          </div>
          <button 
            className="md:hidden p-1 text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
            <div className="p-4 border-b border-slate-800">
                <p className="text-sm text-slate-400">Welcome,</p>
                <h2 className="text-lg font-semibold text-white truncate">{userName || 'SEO Enthusiast'}</h2>
            </div>
            <nav className="p-4">
              <ul>
                {sections.map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => onSectionSelect(section.id)}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                        activeSectionId === section.id
                          ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <span className={activeSectionId === section.id ? 'text-cyan-400' : 'text-slate-500'}>
                          {section.icon}
                      </span>
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
        </div>
        
        {userName && (
          <div className="p-4 border-t border-slate-800 flex-shrink-0">
            <button
              onClick={onLogout}
              className="w-full text-center text-sm p-2 rounded-lg transition-colors bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
            >
              Change User
            </button>
          </div>
        )}
      </aside>
    </>
  );
};