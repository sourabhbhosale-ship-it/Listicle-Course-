import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 pb-6 border-t border-slate-800/60 text-center animate-fade-in w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-slate-400 font-medium text-sm">
          Course by{' '}
          <a 
            href="https://in.linkedin.com/in/sourabh-bhosale-740533212" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 tracking-wide font-semibold hover:text-cyan-300 transition-colors border-b border-transparent hover:border-cyan-300"
          >
            Sourabh Bhosale
          </a>
        </p>
        <p className="text-slate-600 text-xs">
           © {new Date().getFullYear()} Next-Gen Listicle Writing Course
        </p>
      </div>
    </footer>
  );
};