import React, { useState } from 'react';
import { Building } from '../types';
import { Maximize2, Lightbulb, X, MapPin, ClipboardList, Crown } from 'lucide-react';

interface HighlightCardProps {
  building: Building;
  rank?: number;
  currentYear?: number;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ building, rank, currentYear }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFact, setShowFact] = useState(false);

  const isProject = building.isUnbuiltProject;
  const isDestroyedAtSelectedYear = currentYear !== undefined && building.yearDestroyed !== undefined && building.yearDestroyed <= currentYear;

  return (
    <>
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-[210]"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <img 
              src={building.imageUrl} 
              alt={building.name}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-500 border border-white/10"
            />
            <div className="mt-6 text-center">
              <h3 className="text-amber-500 font-serif text-3xl font-bold mb-2">{building.name}</h3>
              <div className="flex items-center justify-center gap-3 text-slate-300 text-lg">
                <div className="flex -space-x-1 border border-transparent">
                  {(Array.isArray(building.countryCode) ? building.countryCode : [building.countryCode]).map((code) => (
                    <img 
                      key={code}
                      src={`https://flagcdn.com/w80/${code}.png`} 
                      alt={building.location} 
                      referrerPolicy="no-referrer"
                      className="w-6 h-4 object-cover rounded shadow-md ring-1 ring-white/20 shrink-0 relative z-10"
                    />
                  ))}
                </div>
                <span>{building.location} • {building.height} метров</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {isProject && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-400 font-bold uppercase text-xs">
                    <ClipboardList className="w-4 h-4" /> Неосуществленный проект
                  </div>
                )}
                {isDestroyedAtSelectedYear && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-500/50 rounded-full text-red-400 font-bold uppercase text-xs">
                    <X className="w-4 h-4" /> Утрачено в {Math.abs(building.yearDestroyed!)} {building.yearDestroyed! < 0 ? 'до н.э.' : 'г.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`bg-slate-900/60 border rounded-2xl flex flex-col overflow-hidden transition-all group relative ${isProject ? 'border-blue-500/20 hover:border-blue-500/50' : 'border-slate-800 hover:border-amber-500/40'} ${isDestroyedAtSelectedYear ? 'grayscale opacity-70 hover:grayscale-0' : ''}`}>
        {/* Image Section */}
        <div className="w-full h-40 relative overflow-hidden bg-slate-800">
          <img 
            src={building.imageUrl} 
            className={`w-full h-full object-cover transition-transform duration-700 ${showFact ? 'scale-110 blur-sm' : 'group-hover:scale-110'}`} 
            loading="lazy" 
            referrerPolicy="no-referrer"
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onClick={() => setIsZoomed(true)}
              className={`p-2 rounded-full shadow-lg hover:scale-110 transition-transform ${isProject ? 'bg-blue-500 text-white' : 'bg-amber-500 text-slate-950'}`}
              title="Увеличить"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Fun Fact Overlay */}
          {showFact && (
            <div 
              className={`absolute inset-0 backdrop-blur-sm p-4 flex flex-col justify-center animate-in slide-in-from-bottom-full duration-300 cursor-pointer overflow-y-auto ${isProject ? 'bg-blue-600/90' : 'bg-amber-500/90'}`}
              onClick={() => setShowFact(false)}
            >
              <div className="flex items-center gap-2 mb-2 shrink-0">
                <Lightbulb className={`w-3 h-3 ${isProject ? 'text-white' : 'text-slate-950'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isProject ? 'text-white' : 'text-slate-950'}`}>Интересно</span>
              </div>
              <p className={`text-xs font-bold leading-tight italic ${isProject ? 'text-white' : 'text-slate-950'}`}>
                {building.funFact}
              </p>
              <button className={`absolute top-2 right-2 hover:opacity-100 opacity-60 shrink-0 ${isProject ? 'text-white' : 'text-slate-950'}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {rank !== undefined && (
              <div className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-black text-[8px] uppercase flex items-center gap-1 w-fit">
                № {rank}
              </div>
            )}
            {isDestroyedAtSelectedYear && (
              <div className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-600/30 font-black text-[8px] uppercase flex items-center gap-1 w-fit">
                <X className="w-2.5 h-2.5" /> Утрачено
              </div>
            )}
            {isProject && (
              <div className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-600/30 font-black text-[8px] uppercase flex items-center gap-1 w-fit">
                <ClipboardList className="w-2.5 h-2.5" /> Проект
              </div>
            )}
            {building.isFormerRecordHolder && (
              <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 font-black text-[8px] uppercase flex items-center gap-1 w-fit">
                <Crown className="w-2.5 h-2.5" /> Рекорд
              </div>
            )}
          </div>
          <div className="mb-3">
            <h4 className={`font-bold text-sm text-white line-clamp-2 transition-colors leading-tight ${isProject ? 'group-hover:text-blue-400' : 'group-hover:text-amber-500'}`}>
              {building.name}
            </h4>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-1.5">
              <div className="flex -space-x-1 relative z-10 hover:space-x-0.5 transition-all">
                {(Array.isArray(building.countryCode) ? building.countryCode : [building.countryCode]).map((code) => (
                  <img 
                    key={code}
                    src={`https://flagcdn.com/w40/${code}.png`} 
                    alt={building.location} 
                    referrerPolicy="no-referrer"
                    className="w-3.5 h-2.5 object-cover rounded-[1px] shadow-sm shrink-0"
                  />
                ))}
              </div>
              <span className="truncate">{building.location}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className={`font-black text-xs ${isProject ? 'text-blue-500' : 'text-amber-500'}`}>
              {building.height} м
            </div>
            <button 
              onClick={() => setShowFact(!showFact)}
              className={`p-1.5 rounded-lg transition-colors ${showFact ? (isProject ? 'bg-blue-500 text-white' : 'bg-amber-500 text-slate-950') : (isProject ? 'bg-slate-800 text-slate-400 hover:text-blue-400' : 'bg-slate-800 text-slate-400 hover:text-amber-500')}`}
              title="Интересный факт"
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};