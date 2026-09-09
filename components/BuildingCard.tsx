import React, { useState, useEffect } from 'react';
import { Building } from '../types';
import { MapPin, Calendar, Sparkles, Lightbulb, ImageOff, Loader2, Maximize2, X, Crown, Skull, ClipboardList, Link, Save, Edit2, Search } from 'lucide-react';

interface BuildingCardProps {
  building: Building;
  rank?: number;
  isActive: boolean;
  currentYear: number;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, rank, isActive, currentYear }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImgStatus('loading');
    
    // Fix for cached images where onLoad might not fire
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setImgStatus('loaded');
      }
    }
  }, [building.id, building.imageUrl]);

  const handleImageError = () => {
    if (imgStatus === 'error') return;
    setImgStatus('error');
  };

  const isDestroyedAtSelectedYear = building.yearDestroyed !== undefined && building.yearDestroyed <= currentYear;
  const isProject = building.isUnbuiltProject;

  return (
    <>
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-2" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white z-[110] transition-transform hover:scale-110"><X /></button>
          <img src={building.imageUrl} alt={building.name} className="w-full h-full max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" referrerPolicy="no-referrer" />
        </div>
      )}

      <div className={`relative overflow-hidden rounded-3xl border transition-all duration-500 group ${
        isActive 
          ? 'bg-slate-900 border-amber-500/50 shadow-[0_20px_50px_rgba(245,158,11,0.15)]' 
          : 'bg-slate-900/40 border-slate-800'
      } ${isDestroyedAtSelectedYear ? 'grayscale opacity-60 hover:grayscale-0' : ''}`}>
        
        <div className="flex flex-col md:flex-row">
          {/* Visual Section */}
          <div className="w-full md:w-[35%] h-64 md:h-auto overflow-hidden relative bg-slate-800/50 flex items-center justify-center min-h-[280px] md:min-h-[380px] group/image cursor-pointer" onClick={() => setIsZoomed(true)}>
            {imgStatus === 'loading' && <Loader2 className="animate-spin text-amber-500" />}
            
            {imgStatus === 'error' && (
               <div className="flex flex-col items-center gap-3 text-slate-500 p-6 text-center w-full">
                 <ImageOff className="w-10 h-10 opacity-50" />
                 <p className="text-xs">Изображение недоступно</p>
               </div>
            )}

            <img 
              ref={imgRef}
              src={building.imageUrl} 
              loading={rank && rank <= 3 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              onLoad={() => setImgStatus('loaded')} 
              onError={handleImageError}
              className={`absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-700 ${imgStatus === 'loaded' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
            
            {imgStatus === 'loaded' && (
              <>
                <button className="absolute bottom-6 right-6 p-2.5 bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-amber-500 hover:text-slate-950 z-20 pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Data Section */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                  {rank !== undefined && rank > 0 && (
                    <div className={`px-3 py-1 rounded-full font-black text-[10px] uppercase flex items-center gap-1.5 w-fit ${rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                      № {rank}
                    </div>
                  )}
                    {isDestroyedAtSelectedYear ? (
                      <div 
                        className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-600/30 font-black text-[10px] uppercase flex items-center gap-1.5 w-fit"
                        title="Здание разрушено или утеряно. На фото представлена реконструкция, рисунок или руины."
                      >
                        <Skull className="w-3 h-3" />
                        Утрачено в {Math.abs(building.yearDestroyed!)} {building.yearDestroyed! < 0 ? 'до н.э.' : 'г.'}
                      </div>
                    ) : isProject ? (
                      <div className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30 font-black text-[10px] uppercase flex items-center gap-1.5 w-fit">
                        <ClipboardList className="w-3 h-3" />
                        Неосуществленный проект
                      </div>
                    ) : building.isFormerRecordHolder && (
                      <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 font-black text-[10px] uppercase flex items-center gap-1.5 w-fit">
                        <Crown className="w-3.5 h-3.5" /> Рекордсмен
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 md:mb-3 group-hover:text-amber-500 transition-colors">
                    {building.name}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm md:text-base">
                    <div className="relative group/flag flex -space-x-1.5 border border-transparent hover:space-x-1 transition-all duration-300 relative z-10">
                      {(Array.isArray(building.countryCode) ? building.countryCode : [building.countryCode]).map(code => (
                        <img 
                          key={code}
                          src={`https://flagcdn.com/w80/${code}.png`} 
                          alt={building.location} 
                          referrerPolicy="no-referrer"
                          className="w-7 h-5 object-cover rounded shadow-[0_2px_5px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-transform group-hover/flag:scale-110 shrink-0"
                        />
                      ))}
                    </div>
                    <span className="tracking-wide">{building.location}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-3xl md:text-4xl font-black text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">{building.height} м</span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-8 text-base md:text-lg font-light">{building.description}</p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl relative overflow-hidden group/fact">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 scale-y-0 group-hover/fact:scale-y-100 transition-transform origin-top duration-500" />
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Уникальный Факт</span>
                </div>
                <p className="text-sm text-slate-200 italic leading-snug">{building.funFact}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                <Calendar className="w-4 h-4 text-amber-500/50" /> 
                <span>{isProject ? 'Год проекта: ' : 'Год постройки: '}</span>
                <span className="text-slate-300 ml-1">{building.yearBuilt < 0 ? `${Math.abs(building.yearBuilt)} г. до н.э.` : `${building.yearBuilt} г.`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};