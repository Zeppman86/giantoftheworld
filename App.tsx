import React, { useState, useMemo } from 'react';
import { BUILDINGS } from './data';
import { BuildingCard } from './components/BuildingCard';
import { HighlightCard } from './components/HighlightCard';
import { TimelineSlider } from './components/TimelineSlider';
import { HeightChart } from './components/HeightChart';
import { EducationSection } from './components/EducationSection';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, History, Globe, Rocket, Landmark, Info, X, Library, Search, Filter, Eye, EyeOff, BookOpen } from 'lucide-react';

type Tab = 'explore' | 'library' | 'education';

const App: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDestroyed, setShowDestroyed] = useState(false);

  // --- ЛОГИКА ИСТОРИЧЕСКОГО СРЕЗА (ТАЙМЛАЙН) ---
  const existingInSelectedYear = useMemo(() => {
    return BUILDINGS.filter(b => {
      const builtByNow = b.yearBuilt <= currentYear;
      const existsNow = b.yearDestroyed === undefined || b.yearDestroyed > currentYear;
      return showDestroyed ? builtByNow : (builtByNow && existsNow);
    }).sort((a, b) => b.height - a.height);
  }, [currentYear, showDestroyed]);

  const topBuildings = useMemo(() => existingInSelectedYear.slice(0, 10), [existingInSelectedYear]);

  const otherHighlights = useMemo(() => {
    const topIds = new Set(topBuildings.map(b => b.id));
    return existingInSelectedYear.filter(b => !topIds.has(b.id)).slice(0, 16);
  }, [topBuildings, existingInSelectedYear]);

  // --- ЛОГИКА АРХИВА ---
  const filteredLibrary = useMemo(() => {
    return BUILDINGS.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || b.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.height - a.height);
  }, [searchQuery, categoryFilter]);

  const currentLeader = topBuildings.find(b => !b.yearDestroyed || b.yearDestroyed > currentYear) || topBuildings[0];

  const handleAiNarrative = async () => {
    if (!currentLeader) return;
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Ты — эксперт по архитектуре. Сейчас ${currentYear} год. 
      Лидер высоты — ${currentLeader.name}. Расскажи уникальный факт об этом времени. 
      Максимум 2 предложения. Не используй слово "сегодня".`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiAnalysis(response.text ?? "Эпоха великих свершений.");
    } catch (err) {
      setAiAnalysis("Время — это иллюзия. Попробуйте снова.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const categories = ['all', 'Ancient', 'Gothic', 'Industrial', 'Modern', 'Engineering', 'Statue', 'Future'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {showInfo && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setShowInfo(false)}>
          <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full p-8 rounded-3xl space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-amber-500">Мировая Хроника</h2>
              <button onClick={() => setShowInfo(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X /></button>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>Этот проект объединяет все величайшие достижения архитектуры. На Таймлайне вы видите только те здания, которые стояли в выбранном году.</p>
              <p className="text-amber-500 font-bold">Почему здания пропадают?</p>
              <p>Многие шедевры (маяки, соборы, башни) были разрушены пожарами или войнами. Чтобы увидеть их после "гибели", включите режим "Показывать утраченные".</p>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="text-amber-500 w-8 h-8" />
          <h1 className="text-xl font-bold font-serif hidden sm:block tracking-tight">Гиганты Земли</h1>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setActiveTab('explore')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'explore' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Таймлайн</button>
          <button onClick={() => setActiveTab('library')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'library' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Архив</button>
          <button onClick={() => setActiveTab('education')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'education' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>Узнать больше</button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setShowInfo(true)} className="p-2 bg-slate-900 border border-slate-700 rounded-full text-slate-400 hover:text-amber-500"><Info /></button>
          {activeTab === 'explore' && (
            <div className="px-5 py-2.5 bg-slate-900 border border-amber-500/30 rounded-full text-2xl font-black text-amber-400 font-serif min-w-[140px] text-center">
              {currentYear < 0 ? `${Math.abs(currentYear)} BC` : `${currentYear}`}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {activeTab === 'explore' && (
          <div className="space-y-16">
            <section className="space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold">Мир в {currentYear < 0 ? `${Math.abs(currentYear)} г. до н.э.` : `${currentYear} г.`}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <button 
                      onClick={() => setShowDestroyed(!showDestroyed)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${showDestroyed ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    >
                      {showDestroyed ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {showDestroyed ? 'Утраченные видны' : 'Утраченные скрыты'}
                    </button>
                  </div>
                </div>
                <button onClick={handleAiNarrative} disabled={isAnalyzing} className="flex items-center gap-2 px-8 py-3 bg-amber-500 text-slate-950 rounded-full font-black uppercase text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">
                  {isAnalyzing ? <div className="animate-spin">◌</div> : <Sparkles className="w-4 h-4" />}
                  <span>Факт об эпохе</span>
                </button>
              </div>

              {aiAnalysis && (
                <div className="p-8 bg-slate-900 border-l-4 border-amber-500 rounded-r-3xl flex gap-6 animate-in zoom-in-95 shadow-2xl">
                  <Globe className="w-10 h-10 text-amber-500 shrink-0 opacity-80" />
                  <p className="text-slate-200 italic font-medium leading-relaxed text-lg">{aiAnalysis}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8">
                {topBuildings.length > 0 ? (
                  topBuildings.map((building, idx) => (
                    <BuildingCard key={building.id} building={building} rank={idx + 1} isActive={idx === 0} currentYear={currentYear} />
                  ))
                ) : (
                  <div className="py-24 text-center opacity-40">
                    <History className="w-24 h-24 mx-auto mb-4 text-slate-700" />
                    <p className="font-serif italic text-2xl text-slate-500">В это время мир только начинал строиться...</p>
                  </div>
                )}
              </div>
            </section>

            {otherHighlights.length > 0 && (
              <section className="space-y-8">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                   <Landmark className="w-4 h-4 text-amber-500" /> Прочие шедевры времени
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {otherHighlights.map((b, idx) => (
                    <HighlightCard key={b.id} building={b} rank={idx + 11} />
                  ))}
                </div>
              </section>
            )}

            <section className="bg-slate-900/30 p-10 rounded-[2.5rem] border border-slate-800 h-[400px]">
              <HeightChart currentYear={currentYear} />
            </section>
          </div>
        )}

        {activeTab === 'library' && (
          <section className="space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold flex items-center gap-4">
                  Великий Архив
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 text-sm rounded-full font-black">
                    {BUILDINGS.length}
                  </span>
                </h2>
                <p className="text-slate-500 text-lg">Полная хроника гигантов всех времен</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Найти по названию или месту..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                    className="pl-12 pr-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl outline-none focus:border-amber-500/50 transition-all w-full sm:w-[300px]" 
                  />
                </div>
                <select 
                  value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} 
                  className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl outline-none focus:border-amber-500/50 transition-all cursor-pointer appearance-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'Все категории' : c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {filteredLibrary.length > 0 ? (
                filteredLibrary.map((b, idx) => (
                  <BuildingCard key={b.id} building={b} rank={idx + 1} isActive={false} currentYear={currentYear} />
                ))
              ) : (
                <div className="py-24 text-center opacity-40">
                  <Library className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                  <p className="text-slate-500">Ничего не найдено в архивах...</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'education' && <EducationSection />}
      </main>

      {activeTab === 'explore' && (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800 p-8">
          <div className="max-w-5xl mx-auto">
            <TimelineSlider value={currentYear} onChange={setCurrentYear} />
          </div>
        </footer>
      )}
      <div className={activeTab === 'explore' ? "h-64" : "h-20"}></div>
    </div>
  );
};

export default App;