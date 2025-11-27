import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  courseName: string;
  completionDate: Date;
}

export const Certificate: React.FC<CertificateProps> = ({ userName, courseName, completionDate }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, 
        backgroundColor: '#0f172a', // Match the dark background
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const x = (pdfWidth - imgWidth * ratio) / 2;
      const y = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Certificate_for_${userName.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not download the certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <div ref={certificateRef} className="w-full max-w-3xl aspect-[1.414/1] bg-slate-900 text-slate-300 p-8 border-4 border-double border-cyan-400/50 rounded-lg shadow-2xl flex flex-col items-center justify-center text-center font-serif">
        <h1 className="text-5xl font-bold text-cyan-400" style={{ fontFamily: 'Georgia, serif' }}>
          Certificate of Completion
        </h1>
        <p className="mt-8 text-lg text-slate-400">This certificate is proudly presented to</p>
        <p className="mt-4 text-4xl font-semibold text-white tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
          {userName}
        </p>
        <div className="w-1/3 h-px bg-slate-600 my-6"></div>
        <p className="text-lg text-slate-400">for successfully completing the</p>
        <p className="mt-2 text-2xl font-medium text-white">
          {courseName}
        </p>
        <p className="mt-1 text-2xl font-medium text-white">
          Course
        </p>
        <div className="mt-auto flex justify-between w-full pt-8 text-sm">
          <div className="text-center">
            <p className="font-semibold text-slate-300">Sourabh Bhosale</p>
            <p className="text-xs text-slate-500 border-t border-slate-600 pt-1 mt-1">Course Director</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-300">{formattedDate}</p>
            <p className="text-xs text-slate-500 border-t border-slate-600 pt-1 mt-1">Date of Completion</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-wait"
      >
        {isDownloading ? 'Downloading...' : 'Download PDF'}
      </button>
    </div>
  );
};
