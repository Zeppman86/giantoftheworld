import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineSliderProps {
  value: number;
  onChange: (val: number) => void;
}

// Конфигурация шкалы до 2035 года
const SCALE_POINTS = [
  { pos: 0, year: -8000 },    // Начало
  { pos: 15, year: -3200 },   // Эпоха мегалитов
  { pos: 25, year: -2560 },   // Пирамиды
  { pos: 45, year: 1311 },    // Соборы
  { pos: 60, year: 1889 },    // Железо
  { pos: 75, year: 1970 },    // Небоскребы
  { pos: 90, year: 2026 },    // Наши дни
  { pos: 100, year: 2035 }    // Ближайшее будущее
];

export const TimelineSlider: React.FC<TimelineSliderProps> = ({ value, onChange }) => {
  
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
    for (let i = 0; i < SCALE_POINTS.length - 1; i++) {
      const start = SCALE_POINTS[i];
      const end = SCALE_POINTS[i + 1];
      if (pos >= start.pos && pos <= end.pos) {
        const range = end.pos - start.pos;
        const progress = (pos - start.pos) / range;
        return Math.round(start.year + progress * (end.year - start.year));
      }
    }
    return SCALE_POINTS[SCALE_POINTS.length - 1].year;
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
              left: `${currentPos}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {value < 0 ? `${Math.abs(value)} до н.э.` : value}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500 rotate-45" />
          </div>

          {SCALE_POINTS.map((pt) => (
            <div 
              key={pt.pos}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-slate-700 pointer-events-none"
              style={{ left: `${pt.pos}%` }}
            />
          ))}
        </div>

        <button 
          onClick={() => onChange(posToYear(Math.min(100, currentPos + 2)))}
          className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-between px-1 text-center">
        <button onClick={() => onChange(-8000)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Начало</button>
        <button onClick={() => onChange(-2560)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Пирамиды</button>
        <button onClick={() => onChange(1311)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Соборы</button>
        <button onClick={() => onChange(1889)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Железо</button>
        <button onClick={() => onChange(1970)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Бетон</button>
        <button onClick={() => onChange(2026)} className="text-[10px] text-slate-500 hover:text-amber-500 font-bold w-1/8 uppercase">Сегодня</button>
        <button onClick={() => onChange(2035)} className="text-[10px] text-amber-500 font-bold w-1/8 uppercase">2035</button>
      </div>
    </div>
  );
};
