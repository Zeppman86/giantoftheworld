import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineSliderProps {
  value: number;
  onChange: (val: number) => void;
}

// Конфигурация шкалы до 2100 года
const SCALE_POINTS = [
  { pos: 0, year: -8000 },    // Начало
  { pos: 15, year: -3200 },   // Эпоха мегалитов
  { pos: 30, year: -2560 },   // Пирамиды
  { pos: 40, year: 1 },       // Наша эра
  { pos: 50, year: 1311 },    // Соборы
  { pos: 65, year: 1889 },    // Железо
  { pos: 80, year: 1970 },    // Небоскребы
  { pos: 95, year: 2026 },    // Наши дни
  { pos: 100, year: 2100 }    // Будущее
];

export const TimelineSlider: React.FC<TimelineSliderProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(value.toString());
    }
  }, [value, isEditing]);

  const handleInputSubmit = () => {
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      const constrained = Math.max(-8000, Math.min(2100, parsed === 0 ? 1 : parsed));
      onChange(constrained);
      setInputValue(constrained.toString());
    } else {
      setInputValue(value.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  
  const yearToPos = (year: number) => {
    if (year > SCALE_POINTS[SCALE_POINTS.length - 1].year) return 100;
    if (year < SCALE_POINTS[0].year) return 0;

    for (let i = 0; i < SCALE_POINTS.length - 1; i++) {
      const start = SCALE_POINTS[i];
      const end = SCALE_POINTS[i + 1];
      if (year >= start.year && year <= end.year) {
        const range = end.year - start.year;
        const progress = (year - start.year) / range;
        return start.pos + progress * (end.pos - start.pos);
      }
    }
    return 100;
  };

  const posToYear = (pos: number) => {
    let year = SCALE_POINTS[SCALE_POINTS.length - 1].year;
    for (let i = 0; i < SCALE_POINTS.length - 1; i++) {
      const start = SCALE_POINTS[i];
      const end = SCALE_POINTS[i + 1];
      if (pos >= start.pos && pos <= end.pos) {
        const range = end.pos - start.pos;
        const progress = (pos - start.pos) / range;
        year = Math.round(start.year + progress * (end.year - start.year));
        break;
      }
    }
    return year === 0 ? 1 : year;
  };

  const currentPos = yearToPos(value);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4 w-full">
        <button 
          onClick={() => onChange(posToYear(Math.max(0, currentPos - 2)))}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="relative flex-1 group py-4">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500/30 transition-all duration-300"
              style={{ width: `${currentPos}%` }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={currentPos}
            onChange={(e) => onChange(posToYear(parseFloat(e.target.value)))}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 opacity-0 cursor-pointer z-10"
          />

          <div 
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] border-2 border-white pointer-events-none z-20 transition-all duration-75"
            style={{ left: `calc(${currentPos}% - 10px)` }}
          />
          
          <div 
            className="absolute -top-10 px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded text-xs pointer-events-none z-30 shadow-lg whitespace-nowrap"
            style={{ 
              left: `clamp(40px, ${currentPos}%, calc(100% - 40px))`,
              transform: 'translateX(-50%)'
            }}
          >
            {value < 0 ? `${Math.abs(value)} до н.э.` : (value === 0 ? `1 н.э.` : `${value} год`)}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rotate-45" />
          </div>

          {SCALE_POINTS.map((pt) => (
            <div 
              key={pt.pos}
              className={`absolute top-1/2 -translate-y-1/2 w-1 ${pt.year === 1 ? 'h-5 bg-amber-500/50' : 'h-3 bg-slate-700'} pointer-events-none`}
              style={{ left: `${pt.pos}%` }}
            >
              {pt.year === 1 && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-bold text-slate-500 whitespace-nowrap">
                  <span className="text-slate-400">← До н.э.</span>
                  <span className="text-amber-500/80">1 год</span>
                  <span className="text-slate-400">Н.э. →</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => onChange(posToYear(Math.min(100, currentPos + 2)))}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between items-center px-1 w-full">
        <button onClick={() => onChange(-8000)} className="text-[9px] sm:text-[10px] text-slate-500 hover:text-amber-500 font-bold uppercase transition-colors py-1">Начало</button>
        <button onClick={() => onChange(-2560)} className="text-[9px] sm:text-[10px] text-slate-500 hover:text-amber-500 font-bold uppercase hidden sm:block transition-colors py-1">Пирамиды</button>
        <button onClick={() => onChange(1311)} className="text-[9px] sm:text-[10px] text-slate-500 hover:text-amber-500 font-bold uppercase hidden md:block transition-colors py-1">Соборы</button>
        <button onClick={() => onChange(1970)} className="text-[9px] sm:text-[10px] text-slate-500 hover:text-amber-500 font-bold uppercase hidden sm:block transition-colors py-1">Бетон</button>
        
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={handleInputSubmit}
            onKeyDown={handleKeyDown}
            className="w-16 sm:w-20 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-[10px] sm:text-xs text-center text-amber-500 font-bold outline-none focus:ring-1 focus:ring-amber-500 transition-all shadow-inner placeholder-slate-600 focus:placeholder-transparent"
            placeholder="Год..."
            title="Введите год и нажмите Enter"
          />
          <button 
            onClick={() => onChange(2026)} 
            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-bold uppercase transition-colors border border-slate-700 whitespace-nowrap shadow-sm"
          >
            2026 г.
          </button>
          <button 
            onClick={() => onChange(2100)} 
            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-md font-bold uppercase transition-colors border border-amber-500/30 whitespace-nowrap shadow-sm"
          >
            Будущее
          </button>
        </div>
      </div>
    </div>
  );
};