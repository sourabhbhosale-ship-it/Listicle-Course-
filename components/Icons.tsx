import React from 'react';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const PencilSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
    </svg>
);

export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.25 4.503v15.002l-4.25-3.036a.75.75 0 00-.92-.04L2.25 19.502V4.503c0-1.242 1.008-2.25 2.25-2.25H9c1.242 0 2.25 1.008 2.25 2.25z" />
      <path d="M12.75 4.503v15.002l4.25-3.036a.75.75 0 01.92-.04l3.83 2.736V4.503c0-1.242-1.008-2.25-2.25-2.25H15c-1.242 0-2.25 1.008-2.25 2.25z" />
    </svg>
);

export const TableCellsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M1.5 3.75A1.75 1.75 0 013.25 2h17.5A1.75 1.75 0 0122.5 3.75v16.5A1.75 1.75 0 0120.75 22H3.25A1.75 1.75 0 011.5 20.25V3.75zM3 8.25V20.25a.25.25 0 00.25.25h17.5a.25.25 0 00.25-.25V8.25H3zM20.75 3.5a.25.25 0 00-.25-.25H3.25a.25.25 0 00-.25.25v3.25H21V3.75a.25.25 0 00-.25-.25z" />
    </svg>
);

export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M12 1.5c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 1.5 12 1.5zm3.157 7.52a.75.75 0 01.07 1.06l-4.5 6a.75.75 0 01-1.137-.089l-2.25-3a.75.75 0 111.137-.974l1.637 2.183 3.98-5.306a.75.75 0 011.06-.07z" clipRule="evenodd" />
    </svg>
);

export const DocumentTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M3.75 3A1.5 1.5 0 002.25 4.5v15A1.5 1.5 0 003.75 21h16.5A1.5 1.5 0 0021.75 19.5V4.5A1.5 1.5 0 0020.25 3H3.75zm.75 9h15v7.5a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V12zm15-1.5H3.75V4.5a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v6z" clipRule="evenodd" />
      <path d="M8.25 6.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM8.25 9.75a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" />
    </svg>
);

export const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v.75a4.5 4.5 0 009 0v-.75a.75.75 0 011.5 0v.75a6 6 0 11-12 0v-.75a.75.75 0 01.75-.75z" />
    </svg>
);

export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export const XCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
);

export const LightBulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.25a.75.75 0 01.75.75v.518c.985.253 1.892.709 2.684 1.331l.38-.38a.75.75 0 111.06 1.06l-.38.38c.623.792 1.079 1.699 1.332 2.684h.518a.75.75 0 010 1.5h-.518a6.74 6.74 0 01-1.332 2.684l.38.38a.75.75 0 11-1.06 1.06l-.38-.38a6.723 6.723 0 01-2.684 1.332v.518a.75.75 0 01-1.5 0v-.518a6.723 6.723 0 01-2.684-1.332l-.38.38a.75.75 0 01-1.06-1.06l.38-.38a6.74 6.74 0 01-1.331-2.684h-.518a.75.75 0 010-1.5h.518c.253-.985.709-1.892 1.332-2.684l-.38-.38a.75.75 0 111.06-1.06l.38.38c.792-.623 1.699-1.078 2.684-1.331V3a.75.75 0 01.75-.75zM10.5 18a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        <path d="M12 21a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V21.75a.75.75 0 01.75-.75z" />
    </svg>
);

export const QuestionMarkCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.25 13.5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 6a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.75 3.375A2.625 2.625 0 0010.125 6H6a.75.75 0 000 1.5h4.125a2.625 2.625 0 005.25 0H18a.75.75 0 000-1.5h-4.125A2.625 2.625 0 0012.75 3.375z" />
        <path fillRule="evenodd" d="M12 8.25a.75.75 0 01.75.75v.5c3.23.354 5.923 2.053 7.426 4.303a.75.75 0 11-1.252.84c-1.28-1.9-3.483-3.26-5.924-3.535v-.608a.75.75 0 01-.75-.75zm-1.5 0a.75.75 0 00-.75.75v.608c-2.44.275-4.644 1.635-5.924 3.535a.75.75 0 11-1.252-.84C4.327 11.553 7.02 9.854 10.25 9.5v-.5a.75.75 0 00-.75-.75zM10.5 19.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
        <path d="M12 21a8.25 8.25 0 100-16.5A8.25 8.25 0 0012 21zm0-1.5a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5z" />
    </svg>
);

export const ExclamationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const InformationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.75-2.25a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V10.5a.75.75 0 01.75-.75zM12 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const ExclamationTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.198 0l7.33 12.696c1.155 2-.77 4.5-3.299 4.5H5.37c-2.53 0-4.454-2.5-3.299-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);