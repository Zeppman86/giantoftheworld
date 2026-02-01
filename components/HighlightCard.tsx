
import React, { useState } from 'react';
import { Building } from '../types';
import { Maximize2, Lightbulb, X, MapPin } from 'lucide-react';

interface HighlightCardProps {
  building: Building;
  rank: number;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ building, rank }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFact, setShowFact] = useState(false);

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
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-500 border border-white/10"
            />
            <div className="mt-6 text-center">
              <h3 className="text-amber-500 font-serif text-2xl font-bold">{building.name}</h3>
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <img 
                  src={`https://flagcdn.com/w40/${building.countryCode}.png`} 
                  alt={building.location} 
                  className="w-4 h-2.5 object-cover rounded-sm"
                />
                <span>{building.location} • {building.height} метров</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col overflow-hidden hover:border-amber-500/40 transition-all group relative">
        {/* Rank Badge */}
        <div className="absolute top-2 left-2 z-10 bg-slate-800/80 backdrop-blur-md text-slate-400 text-[10px] font-black px-2 py-0.5 rounded-md border border-slate-700">
          #{rank}
        </div>

        {/* Image Section */}
        <div className="w-full h-40 relative overflow-hidden bg-slate-800">
          <img 
            src={building.imageUrl} 
            className={`w-full h-full object-cover transition-transform duration-700 ${showFact ? 'scale-110 blur-sm' : 'group-hover:scale-110'}`} 
            loading="lazy" 
          />
          
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onClick={() => setIsZoomed(true)}
              className="p-2 bg-amber-500 text-slate-950 rounded-full shadow-lg hover:scale-110 transition-transform"
              title="Увеличить"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Fun Fact Overlay */}
          {showFact && (
            <div 
              className="absolute inset-0 bg-amber-500/90 backdrop-blur-sm p-4 flex flex-col justify-center animate-in slide-in-from-bottom-full duration-300 cursor-pointer"
              onClick={() => setShowFact(false)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3 h-3 text-slate-950" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-950">Факт</span>
              </div>
              <p className="text-xs text-slate-950 font-bold leading-tight italic">
                {building.funFact}
              </p>
              <button className="absolute top-2 right-2 text-slate-950/60 hover:text-slate-950">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col flex-1">
          <div className="mb-3">
            <h4 className="font-bold text-sm text-white truncate group-hover:text-amber-500 transition-colors leading-tight">
              {building.name}
            </h4>
            <div className="flex items-center gap-2 text-slate-500 text-[10px] mt-1">
              <img 
                src={`https://flagcdn.com/w40/${building.countryCode}.png`} 
                alt={building.location} 
                className="w-3.5 h-2.5 object-cover rounded-[1px]"
              />
              <span className="truncate">{building.location}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-amber-500 font-black text-xs">
              {building.height} м
            </div>
            <button 
              onClick={() => setShowFact(!showFact)}
              className={`p-1.5 rounded-lg transition-colors ${showFact ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-amber-500'}`}
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
