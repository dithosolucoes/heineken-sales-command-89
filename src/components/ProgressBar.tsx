
import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showValue = true,
  size = "md",
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-tactical-silver">{label}</span>
          {showValue && (
            <span className="text-heineken-neon">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full ${heightClass[size]} bg-tactical-darkgray rounded-full overflow-hidden`}>
        <div
          className="h-full bg-gradient-to-r from-heineken to-heineken-neon"
          style={{ 
            width: `${percentage}%`,
            boxShadow: '0 0 10px rgba(62, 255, 127, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
