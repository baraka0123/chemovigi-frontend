import React from 'react';
import chemovigiLogo from 'figma:asset/65db2ed9966937d0b406a05efc1cca16cba5d800.png';

interface ChemoVigiLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function ChemoVigiLogo({ size = 'medium', showText = true }: ChemoVigiLogoProps) {
  const sizes = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16'
  };

  return (
    <div className="flex items-center gap-3">
      <img 
        src={chemovigiLogo} 
        alt="ChemoVigi Logo" 
        className={`${sizes[size]} w-auto`}
      />
      {showText && (
        <div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-blue-600 font-bold text-xl">Chemo</span>
            <span className="text-teal-600 font-bold text-xl">Vigi</span>
          </div>
          <p className="text-xs text-slate-500">Where Innovation Meets Technology</p>
        </div>
      )}
    </div>
  );
}
