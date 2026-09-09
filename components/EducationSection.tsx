import React, { useState } from 'react';
import { Ruler, Wind, Zap, BookOpen, Compass, Info, Maximize2, Sparkles, Building2, TowerControl as Tower, Clock, ShieldCheck, Gamepad2, ArrowRight, RotateCcw } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <div className="space-y-20 animate-in slide-in-from-bottom-10 duration-700 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-500 border border-amber-500/20 text-sm font-bold uppercase tracking-widest">
          <Gamepad2 className="w-4 h-4" /> Интерактивная Зона
        </div>
        <h2 className="text-5xl font-serif font-bold text-white">Лаборатория Гигантов</h2>
        <p className="text-slate-400 text-lg">Не просто читайте — пробуйте, считайте и исследуйте физику небоскребов.</p>
      </div>

      {/* 1. INTERACTIVE COMPARISON CALCULATOR */}
      <ScaleCalculator />

      {/* 2. WIND SIMULATION */}
      <WindSimulation />

      {/* 3. TRIVIA QUIZ */}
      <TriviaQuiz />
      
      {/* Static Knowledge Cards */}
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
    </div>
  );
};

// --- SUB-COMPONENT: SCALE CALCULATOR ---
const ScaleCalculator: React.FC = () => {
  const [buildingHeight, setBuildingHeight] = useState(828); // Burj Khalifa default
  const [unitHeight, setUnitHeight] = useState(1.7); // Human default
  const [buildingName, setBuildingName] = useState('Бурдж-Халифа');
  const [unitName, setUnitName] = useState('Человек');
  const [unitIcon, setUnitIcon] = useState('🧍');

  const count = Math.round(buildingHeight / unitHeight);

  const buildings = [
    { name: 'Пирамида Хеопса', height: 146, id: 'khufu' },
    { name: 'Эйфелева башня', height: 324, id: 'eiffel' },
    { name: 'Бурдж-Халифа', height: 828, id: 'burj' },
    { name: 'Джидда Тауэр', height: 1000, id: 'jeddah' },
  ];

  const units = [
    { name: 'Человек', height: 1.7, icon: '🧍' },
    { name: 'Слон', height: 4, icon: '🐘' },
    { name: 'Автобус (длина)', height: 12, icon: '🚌' },
    { name: 'Синий кит', height: 30, icon: '🐋' },
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
      <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
            <Ruler className="text-amber-500" /> Калькулятор Величия
          </h3>
          <p className="text-slate-500 mt-2">Сколько объектов нужно поставить друг на друга?</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-amber-500 font-mono">{count}</div>
          <div className="text-xs font-bold uppercase text-slate-500 tracking-widest">{unitName}ов(а)</div>
        </div>
      </div>

      <div className="p-8 bg-slate-950/50 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Выберите гиганта</label>
            <div className="grid grid-cols-2 gap-2">
              {buildings.map(b => (
                <button 
                  key={b.id}
                  onClick={() => { setBuildingHeight(b.height); setBuildingName(b.name); }}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all border ${buildingHeight === b.height ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                >
                  {b.name} ({b.height}м)
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Выберите меру</label>
            <div className="grid grid-cols-2 gap-2">
              {units.map(u => (
                <button 
                  key={u.name}
                  onClick={() => { setUnitHeight(u.height); setUnitName(u.name); setUnitIcon(u.icon); }}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all border ${unitHeight === u.height ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'}`}
                >
                  {u.icon} {u.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 h-64 overflow-hidden relative flex flex-col-reverse items-center gap-1 shadow-inner">
           <div className="absolute top-2 right-2 text-[10px] text-slate-600 font-mono">Визуализация (масштаб ~1:10)</div>
           {Array.from({ length: Math.min(count, 80) }).map((_, i) => (
             <div key={i} className="text-xl leading-none animate-in slide-in-from-bottom duration-300" style={{ animationDelay: `${i * 10}ms` }}>
               {unitIcon}
             </div>
           ))}
           {count > 80 && <div className="text-slate-500 text-xs font-bold">+ еще {count - 80}...</div>}
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: WIND SIMULATION ---
const WindSimulation: React.FC = () => {
  const [shape, setShape] = useState<'square' | 'round'>('square');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row">
       <div className="p-10 flex-1 space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
              <Wind className="text-blue-500" /> Аэродинамика
            </h3>
            <p className="text-slate-400 mt-2 leading-relaxed">
              Главный враг небоскреба — не гравитация, а ветер. Посмотрите, почему современные башни не строят квадратными.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setShape('square')}
              className={`flex-1 py-3 rounded-xl font-bold border transition-all ${shape === 'square' ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              Квадрат
            </button>
            <button 
              onClick={() => setShape('round')}
              className={`flex-1 py-3 rounded-xl font-bold border transition-all ${shape === 'round' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              Круг/Спираль
            </button>
          </div>

          <div className={`p-4 rounded-xl text-sm border ${shape === 'square' ? 'bg-red-950/30 border-red-900/50 text-red-200' : 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200'}`}>
            {shape === 'square' 
              ? "ОПАСНО: Ветер ударяется о плоскую стену, создавая мощные вихри (турбулентность) позади. Здание будет сильно раскачиваться." 
              : "ОТЛИЧНО: Ветер плавно обтекает форму. Вихри срываются несинхронно, что делает здание устойчивым."}
          </div>
       </div>

       <div className="relative w-full md:w-[400px] h-[300px] bg-slate-950 overflow-hidden flex items-center justify-center">
          {/* Wind Lines Animation */}
          <div className="absolute inset-0 opacity-30">
             {Array.from({ length: 10 }).map((_, i) => (
               <div 
                  key={i} 
                  className={`absolute h-0.5 bg-white top-[${i * 10}%] animate-wind`}
                  style={{ 
                    top: `${10 + i * 8}%`,
                    left: '-10%',
                    width: '120%',
                    animation: `windFlow 2s linear infinite`,
                    animationDelay: `${i * 0.1}s` 
                  }}
               />
             ))}
          </div>

          {/* Building Shape */}
          <div className={`relative z-10 w-24 h-24 transition-all duration-500 ${shape === 'square' ? 'bg-red-500' : 'bg-emerald-500 rounded-full'}`}>
             <div className="absolute inset-0 flex items-center justify-center text-slate-950 font-black">
                {shape === 'square' ? '■' : '●'}
             </div>
          </div>

          {/* Turbulence Visualization (Simplified CSS) */}
          <div className="absolute inset-0 pointer-events-none">
             {shape === 'square' && (
                <>
                  <div className="absolute top-[35%] right-[20%] w-8 h-8 border-2 border-red-500/50 rounded-full animate-spin" />
                  <div className="absolute top-[55%] right-[25%] w-12 h-12 border-2 border-red-500/50 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                </>
             )}
              {shape === 'round' && (
                <>
                  <div className="absolute top-[35%] right-[10%] w-20 h-0.5 bg-emerald-500/30 rotate-12" />
                  <div className="absolute top-[60%] right-[10%] w-20 h-0.5 bg-emerald-500/30 -rotate-12" />
                </>
             )}
          </div>
       </div>
    </section>
  );
};

// --- SUB-COMPONENT: TRIVIA QUIZ ---
const TriviaQuiz: React.FC = () => {
  const questions = [
    { q: "Эмпайр-стейт-билдинг планировали использовать как причал для дирижаблей.", a: true, fact: "Правда! Шпиль был спроектирован как мачта, но ветер делал швартовку невозможной." },
    { q: "Великая пирамида Хеопса была самым высоким зданием всего 500 лет.", a: false, fact: "Ложь! Она удерживала рекорд почти 3800 лет — абсолютный рекорд в истории." },
    { q: "Эйфелева башня должна была быть снесена через 20 лет после постройки.", a: true, fact: "Правда! Её спасло только изобретение радио — башня стала идеальной антенной." },
    { q: "Бурдж-Халифа не подключена к городской канализации.", a: true, fact: "Правда (частично)! Долгое время отходы вывозили грузовиками, так как городская сеть не справлялась." },
    { q: "Статуя Свободы выше, чем Биг-Бен.", a: false, fact: "Ложь! Биг-Бен (96 м) немного выше Статуи Свободы (93 м)." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: boolean) => {
    if (answer === questions[currentIndex].a) {
      setScore(s => s + 1);
    }
    setIsFlipped(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFlipped(false);
    setIsFinished(false);
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Sparkles className="w-40 h-40 text-white" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {!isFinished ? (
          <>
            <div className="flex justify-between items-center mb-8 text-sm font-bold uppercase tracking-widest text-slate-400">
              <span>Вопрос {currentIndex + 1} / {questions.length}</span>
              <span>Счет: {score}</span>
            </div>

            <div className="min-h-[200px] flex items-center justify-center mb-8 perspective-1000">
              {!isFlipped ? (
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white animate-in zoom-in-95 duration-300">
                  {questions[currentIndex].q}
                </h3>
              ) : (
                 <div className="animate-in flip-in-y duration-500 bg-slate-950/50 p-6 rounded-2xl border border-slate-600 w-full">
                    <p className={`text-xl font-bold mb-2 ${questions[currentIndex].a ? 'text-green-400' : 'text-amber-400'}`}>
                      {questions[currentIndex].a ? "Это правда!" : "Это миф!"}
                    </p>
                    <p className="text-slate-300">{questions[currentIndex].fact}</p>
                 </div>
              )}
            </div>

            {!isFlipped ? (
              <div className="flex gap-4 justify-center">
                <button onClick={() => handleAnswer(true)} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg">
                  Правда
                </button>
                <button onClick={() => handleAnswer(false)} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg">
                  Ложь
                </button>
              </div>
            ) : (
              <button onClick={nextQuestion} className="px-10 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl flex items-center gap-2 mx-auto hover:bg-white transition-all">
                Дальше <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="py-10 animate-in zoom-in duration-500">
            <h3 className="text-4xl font-serif font-bold text-amber-500 mb-4">Тест завершен!</h3>
            <p className="text-2xl text-white mb-8">Вы набрали {score} из {questions.length} баллов.</p>
            <button onClick={resetQuiz} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl flex items-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" /> Попробовать снова
            </button>
          </div>
        )}
      </div>
    </section>
  );
};