import React from 'react';
import { Ruler, Wind, Zap, BookOpen, Compass, Info, Maximize2, Sparkles, Building2, TowerControl as Tower, Clock, ShieldCheck } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const comparisons = [
    { name: 'Синий кит', size: 30, color: 'bg-blue-500', icon: '🐳' },
    { name: 'Статуя Свободы', size: 93, color: 'bg-green-500', icon: '🗽' },
    { name: 'Футбольное поле', size: 105, color: 'bg-emerald-500', icon: '⚽' },
    { name: 'Бурдж-Халифа', size: 828, color: 'bg-amber-500', icon: '🏢' },
    { name: 'Джидда Тауэр', size: 1000, color: 'bg-red-500', icon: '🚀' },
  ];

  return (
    <div className="space-y-16 animate-in slide-in-from-bottom-10 duration-700 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20 text-sm font-bold uppercase tracking-widest">
          <BookOpen className="w-4 h-4" /> Архитектурная энциклопедия
        </div>
        <h2 className="text-5xl font-serif font-bold text-white">Как измеряется величие?</h2>
        <p className="text-slate-400 text-lg">Погрузитесь в секреты инженерии и узнайте, как люди строят выше облаков.</p>
      </div>

      {/* Visual Scale Comparison */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-[3rem] p-10 space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-2xl text-slate-950"><Maximize2 /></div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white">Масштаб без цифр</h3>
            <p className="text-slate-500">Сравним гигантов мира с тем, что нам знакомо.</p>
          </div>
        </div>

        <div className="space-y-6">
          {comparisons.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-2">{item.icon} {item.name}</span>
                <span>{item.size} м</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  style={{ width: `${(item.size / 1000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-sm text-slate-400 leading-relaxed italic">
          Интересный факт: 1000-метровая башня (Джидда Тауэр) — это почти 11 Статуй Свободы или 33 Синих кита в длину!
        </div>
      </section>

      {/* Categories & Measurement */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 space-y-8">
          <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-4">
            <Compass className="text-amber-500" /> Как считают высоту?
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-black text-amber-500 uppercase text-xs tracking-widest">Architectural (Архитектурная)</h4>
              <p className="text-slate-300 text-sm">До шпиля, но без антенн. Это стандарт для рейтинга небоскребов.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-amber-500 uppercase text-xs tracking-widest">To Tip (До кончика)</h4>
              <p className="text-slate-300 text-sm">Включая всё оборудование на крыше. Используется для телебашен.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-amber-500 uppercase text-xs tracking-widest">Occupied (Занятая)</h4>
              <p className="text-slate-300 text-sm">До последнего этажа, где люди могут реально находиться.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 space-y-8">
          <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-4">
            <ShieldCheck className="text-blue-500" /> Типы построек
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-white mb-1">Здание</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Минимум 50% высоты занято полезными этажами (офисы, квартиры).</p>
            </div>
            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-white mb-1">Телебашня</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Полезных этажей меньше половины. Главная цель — связь и обзор.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Secrets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4 hover:border-amber-500/30 transition-all group">
          <Wind className="w-10 h-10 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-serif font-bold">Обман ветра</h4>
          <p className="text-sm text-slate-400">Закрученная форма Шанхайской башни «путает» ветер, снижая нагрузки на 24%.</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4 hover:border-blue-500/30 transition-all group">
          <Zap className="w-10 h-10 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-serif font-bold">Лифты-ракеты</h4>
          <p className="text-sm text-slate-400">Лифты разгоняются до 20 м/с. Это как ехать по вертикальному шоссе!</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-4 hover:border-emerald-500/30 transition-all group">
          <Clock className="w-10 h-10 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-xl font-serif font-bold">Часы-маяк</h4>
          <p className="text-sm text-slate-400">Часы в Мекке подсвечены 1 млн LED-огней и видны за десятки километров.</p>
        </div>
      </div>

      <div className="text-center py-10 opacity-50">
        <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-500">Знание — это фундамент величия</p>
      </div>
    </div>
  );
};
