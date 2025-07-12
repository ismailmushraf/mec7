import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {/* Main Logo Text */}
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-800">Mec</span>
          <div className="relative ml-0.5">
            {/* 7 with person representation */}
            <div className="relative">
              <span className="text-3xl font-bold text-gray-800">7</span>
              {/* Person dot - head in the middle */}
              <div 
                className="absolute w-2 h-2 bg-gray-800 rounded-full z-10"
                style={{ top: '-2px', left: '18px' }}
              ></div>
              {/* Swoosh - parallel line forming the other side of body */}
              <div 
                className="absolute w-1 bg-[#15B1F1]" 
                style={{
                  height: '23px',
                  top: '9px',
                  left: '20px',
                  transform: 'rotate(25deg)',
                  transformOrigin: 'top',
                  borderRadius: '2px'
                }}
              ></div>
              <div 
                className="absolute w-1 bg-[#15B1F1]" 
                style={{
                  height: '15px',
                  top: '11px',
                  left: '19px',
                  transform: 'rotate(-60deg)',
                  transformOrigin: 'top',
                  borderRadius: '2px'
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* Subtitle */}
        <div className="text-[10px] tracking-[0.2em] text-gray-500 font-medium -mt-1 uppercase">
          Peruvallur
        </div>
      </div>
    </div>
  );
};

export default Logo;
