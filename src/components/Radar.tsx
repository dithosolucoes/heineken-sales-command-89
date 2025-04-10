
import React from "react";

const Radar: React.FC = () => {
  return (
    <div className="relative w-40 h-40">
      {/* Radar background */}
      <div className="absolute inset-0 rounded-full border border-heineken/30 bg-tactical-black/80" />
      
      {/* Radar grid lines */}
      <div className="absolute inset-0 rounded-full border border-heineken/20">
        <div className="absolute inset-[25%] rounded-full border border-heineken/20" />
        <div className="absolute inset-[50%] rounded-full border border-heineken/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-heineken/20" />
        </div>
        <div className="absolute inset-0 flex justify-center">
          <div className="h-full w-px bg-heineken/20" />
        </div>
      </div>
      
      {/* Radar sweep */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 w-1/2 h-px bg-heineken-neon origin-left animate-radar-scan" 
          style={{ 
            boxShadow: '0 0 10px rgba(62, 255, 127, 0.7), 0 0 20px rgba(62, 255, 127, 0.5), 0 0 30px rgba(62, 255, 127, 0.3)',
            transform: 'translateY(-50%)'
          }}
        />
      </div>
      
      {/* Sample blips */}
      <div className="absolute top-[30%] left-[65%] w-1.5 h-1.5 rounded-full bg-heineken-neon animate-pulse-green" />
      <div className="absolute top-[70%] left-[40%] w-1.5 h-1.5 rounded-full bg-tactical-gold animate-pulse-green" />
      <div className="absolute top-[45%] left-[20%] w-1.5 h-1.5 rounded-full bg-tactical-silver animate-pulse-green" />
    </div>
  );
};

export default Radar;
