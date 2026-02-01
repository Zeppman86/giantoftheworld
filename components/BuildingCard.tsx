
import React, { useState, useEffect } from 'react';
import { Building } from '../types';
import { MapPin, Calendar, Sparkles, Lightbulb, ImageOff, Loader2, Maximize2, X, Crown, Skull } from 'lucide-react';

interface BuildingCardProps {
  building: Building;
  rank: number;
  isActive: boolean;
  currentYear: number;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, rank, isActive, currentYear }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setImgStatus('loading');
  }, [building.id]);

  const isDestroyedAtSelectedYear = building.yearDestroyed !== undefined && building.yearDestroyed <= currentYear;

  return (
    <>
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white z-[110]"><X /></button>
          <img src={building.imageUrl} alt={building.name} className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}

      <div className={`relative overflow-hidden rounded-3xl border transition-all duration-500 group ${
        isActive 
          ? 'bg-slate-900 border-amber-500/50 shadow-2xl' 
          : 'bg-slate-900/40 border-slate-800'
      } ${isDestroyedAtSelectedYear ? 'grayscale opacity-60 hover:grayscale-0' : ''}`}>
        
        <div className="flex flex-col md:flex-row">
          <div className={`absolute top-0 left-0 z-10 px-5 py-2.5 rounded-br-2xl font-black text-sm flex items-center gap-2 ${
            rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
          }`}>
            № {rank}
          </div>

          {isDestroyedAtSelectedYear && (
            <div className="absolute top-0 right-0 z-10 px-4 py-2.5 rounded-bl-2xl bg-red-600 text-white font-black text-[10px] uppercase flex items-center gap-2">
              <Skull className="w-3 h-3" />
              Утрачено в {building.yearDestroyed} г.
            </div>
          )}

          {!isDestroyedAtSelectedYear && building.isFormerRecordHolder && (
            <div className="absolute top-0 right-0 z-10 px-4 py-2.5 rounded-bl-2xl bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
              <Crown className="w-3.5 h-3.5 inline mr-1" /> Рекордсмен
            </div>
          )}

          <div className="w-full md:w-[35%] h-72 md:h-auto overflow-hidden relative bg-slate-800/50 flex items-center justify-center min-h-[380px]">
            {imgStatus === 'loading' && <Loader2 className="animate-spin text-amber-500" />}
            <img 
              src={building.imageUrl} onLoad={() => setImgStatus('loaded')} onError={() => setImgStatus('error')}
              className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-all ${imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            />
            {imgStatus === 'loaded' && (
              <button onClick={() => setIsZoomed(true)} className="absolute bottom-6 right-6 p-2.5 bg-slate-950/70 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">{building.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <img 
                      src={`https://flagcdn.com/w40/${building.countryCode}.png`} 
                      alt={building.location} 
                      className="w-5 h-3.5 object-cover rounded-sm shadow-sm ring-1 ring-white/10"
                    />
                    <span>{building.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-amber-500">{building.height} м</span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-8">{building.description}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-black uppercase text-amber-500">Факт</span>
                </div>
                <p className="text-sm text-slate-200 italic">{building.funFact}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Calendar className="w-4 h-4" /> Построено: {building.yearBuilt < 0 ? `${Math.abs(building.yearBuilt)} BC` : `${building.yearBuilt} г.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
