import React, { useState, useMemo, useEffect } from 'react';
import { BUILDINGS as SYSTEM_BUILDINGS, TOP_200 } from './data';
import { BuildingCard } from './components/BuildingCard';
import { TimelineSlider } from './components/TimelineSlider';
import { HeightChart } from './components/HeightChart';
import { EducationSection } from './components/EducationSection';
import { AboutSection } from './components/AboutSection';
import { Building } from './types';
import { Sparkles, History, Globe, Rocket, Landmark, Info, X, Library, Search, Eye, EyeOff, Save, CheckCircle2, Download, Upload, Database, RefreshCcw, Bookmark, HelpCircle, List } from 'lucide-react';

type Tab = 'explore' | 'library' | 'about';

// Fix: Make TARGET_COUNT dynamic to match actual system base length.
const TARGET_COUNT = SYSTEM_BUILDINGS.length;

const FUTURE_BUILDINGS: Building[] = [
  { id: 'x-seed', name: 'X-Seed 4000', location: 'Япония', countryCode: 'jp', height: 4000, yearBuilt: 2099, activeUntil: 2200, category: 'Modern' as const, description: 'Утопический проект мегаструктуры-города, способного вместить до миллиона жителей. Здание будет иметь форму горы Фудзияма.', funFact: 'Основание этой грандиозной конструкции должно быть около 6 км в ширину.', imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/4/4c/X-seed4000.jpg', forceImageUpdate: true },
  { id: 'nikitin-travush', name: 'Башня Никитина-Травуша', location: 'Россия / Япония', countryCode: ['ru', 'jp'], height: 4000, yearBuilt: 2050, activeUntil: 2200, category: 'Engineering' as const, description: 'Концептуальный проект советских инженеров (разработчиков Останкинской башни). Этот стальной шпиль высотой 4 км мог бы стать высочайшим сооружением на планете.', funFact: 'Башня должна была проектироваться для Японии, но строительство так и не началось из-за сложности и стоимости.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nikitin-4000-Tokyo-Tower_project_skyline.jpg/500px-Nikitin-4000-Tokyo-Tower_project_skyline.jpg', forceImageUpdate: true },
  { id: 'shimizu-pyramid', name: 'Shimizu Mega-City Pyramid', location: 'Япония', countryCode: 'jp', height: 2004, yearBuilt: 2100, activeUntil: 2200, category: 'Modern' as const, description: 'Огромная пирамида над Токийским заливом, способная вместить миллион человек. Высота этой структуры в 14 раз превосходила бы пирамиду Хеопса.', funFact: 'Для ее возведения потребуется использовать углеродные нанотрубки, поскольку обычные материалы не выдержат такого веса.', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Shimizu_Mega-City_Pyramid_concept_from_Extreme_Engineering.gif', forceImageUpdate: true },
  { id: 'sky-mile', name: 'Sky Mile Tower', location: 'Япония', countryCode: 'jp', height: 1700, yearBuilt: 2045, activeUntil: 2200, category: 'Modern' as const, description: 'Концепция башни в Токийском заливе, которая будет в два раза выше Бурдж-Халифа. Включает многоуровневые системы ветрозащиты.', funFact: 'Спроектирована так, чтобы выдерживать частые землетрясения и тайфуны.', imageUrl: 'https://media.cntraveler.com/photos/5a9d6e8660543c4ae96c3497/16:9/w_1920,c_limit/tokyo-will-look-like-2045-including-mile-high-skyscraper-01.JPG', forceImageUpdate: true },
  { id: 'the-illinois', name: '«Иллинойс» (The Illinois)', location: 'США', countryCode: 'us', height: 1609, yearBuilt: 2060, activeUntil: 2200, category: 'Modern' as const, description: 'Знаменитый проект Фрэнка Ллойда Райта (1956 г.) башни высотой ровно 1 миля для Чикаго. Башня-мечта, предвосхитившая небоскребы XXI века.', funFact: 'По проекту здание должно было обслуживаться 76 атомными лифтами.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/The_Illinois.png/500px-The_Illinois.png', forceImageUpdate: true },
  { id: 'dubai-creek', name: 'Dubai Creek Tower', location: 'ОАЭ', countryCode: 'ae', height: 1300, yearBuilt: 2035, activeUntil: 2200, category: 'Modern' as const, description: 'Грандиозная смотровая башня на стальных тросах. Предполагалось, что она превзойдет Бурдж-Халифа на несколько сотен метров.', funFact: 'Форма башни вдохновлена цветком лилии и минаретом.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Creek_Tower.webp/500px-Creek_Tower.webp.png', forceImageUpdate: true },
  { id: 'bionic-tower', name: 'Бионическая башня', location: 'Китай (проект из Испании)', countryCode: ['cn', 'es'], height: 1128, yearBuilt: 2040, activeUntil: 2200, category: 'Modern' as const, description: 'Футуристический вертикальный город на 100 тысяч жителей, спроектированный испанцами для Шанхая.', funFact: 'Башня должна стоять на искусственном острове-фундаменте, имитирующем корневую систему деревьев.', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Bionic_Tower_rendering.jpg/500px-Bionic_Tower_rendering.jpg', forceImageUpdate: true },
  { id: 'ultima-tower', name: 'Башня Ультима', location: 'США', countryCode: 'us', height: 3218, yearBuilt: 2080, activeUntil: 2200, category: 'Modern' as const, description: 'Концепция сверхвысокого небоскреба, предложенная архитектором Юджином Цуи. Задумывалась как решение проблем перенаселения.', funFact: 'Форма башни напоминает термитник — это сделано для максимальной аэродинамической устойчивости.', imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/3/32/%D0%A3%D0%BB%D1%8C%D1%82%D0%B8%D0%BC%D0%B0-%D1%82%D0%B0%D1%83%D1%8D%D1%80.jpg', forceImageUpdate: true },
  { id: 'sky-city-1000', name: 'Sky City 1000', location: 'Япония', countryCode: 'jp', height: 1000, yearBuilt: 2050, activeUntil: 2200, category: 'Modern' as const, description: 'Концепт 1989 года. Четырнадцать гигантских ярусов-кратеров, стоящих друг на друге, с открытыми парками и лесами на каждом уровне.', funFact: 'Предполагалось, что в город-башню будут заезжать монорельсовые поезда.', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Skycity1000_01.jpg/500px-Skycity1000_01.jpg', forceImageUpdate: true },
  { id: 'the-line', name: 'The Line (Линия)', location: 'Саудовская Аравия', countryCode: 'sa', height: 500, yearBuilt: 2030, activeUntil: 2200, category: 'Modern' as const, description: 'Уникальный линейный мегагород в пустыне Неом. Имея высоту полкилометра, здание протянется на 170 километров в длину.', funFact: 'Снаружи город будет полностью покрыт зеркальными экранами для отражения солнца и слияния с пейзажем.', imageUrl: 'https://www.architime.ru/news/morphosis/2.jpg', forceImageUpdate: true }
];

const App: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>(SYSTEM_BUILDINGS);
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDestroyed, setShowDestroyed] = useState(false);

  // --- PERSISTENCE & FORCE SYNC ---
  useEffect(() => {
    // UPDATED KEYS TO V13 TO FORCE REFRESH OF DATA WITH NEW REAL BUILDINGS
    const savedYear = localStorage.getItem('giant_snapshot_year_v14');
    if (savedYear) setCurrentYear(parseInt(savedYear));

    const customDataRaw = localStorage.getItem('giant_custom_archive_v14');

    if (customDataRaw) {
      try {
        const customData: Building[] = JSON.parse(customDataRaw);
        
        // Smart Merge: Use SYSTEM_BUILDINGS as the base (to get new content/fixes),
        // but preserve custom images from local storage ONLY if they were manually set by the user.
        const mergedBuildings = SYSTEM_BUILDINGS.map(sysBuilding => {
          const customBuilding = customData.find(c => c.id === sysBuilding.id);
          
          // If the user explicitly set this image manually via the UI, keep it.
          // Unless the system explicitly forces an update for this building.
          if (customBuilding && customBuilding.imageSource === 'manual' && !sysBuilding.forceImageUpdate) {
            return { 
              ...sysBuilding, 
              imageUrl: customBuilding.imageUrl,
              imageSource: 'manual'
            };
          }
          
          // Otherwise, use the system building (which includes AI updates from data.ts)
          return sysBuilding;
        });

        setBuildings(mergedBuildings);
        
        // Update local storage to match the new merged state
        if (JSON.stringify(mergedBuildings) !== customDataRaw) {
           console.log("Synced Master Base with Custom Images");
           localStorage.setItem('giant_custom_archive_v14', JSON.stringify(mergedBuildings));
        }
      } catch (e) {
        console.error("Error parsing local data, resetting to system defaults", e);
        setBuildings(SYSTEM_BUILDINGS);
      }
    } else {
      setBuildings(SYSTEM_BUILDINGS); // Always start with system on fresh key
      localStorage.setItem('giant_custom_archive_v14', JSON.stringify(SYSTEM_BUILDINGS));
    }
  }, []);

  // 1. Calculate ALL relevant data for the year
  const relevantData = useMemo(() => {
    return buildings.filter(b => {
      const builtByNow = b.yearBuilt <= currentYear;
      const existsNow = b.yearDestroyed === undefined || b.yearDestroyed > currentYear;
      
      return showDestroyed ? builtByNow : (builtByNow && existsNow);
    }).map(b => {
      if (b.heightHistory) {
        let currentH = b.height;
        for (const h of b.heightHistory) {
          if (currentYear >= h.year) {
            currentH = h.height;
          }
        }
        return { ...b, height: currentH };
      }
      return b;
    }).sort((a, b) => b.height - a.height);
  }, [currentYear, showDestroyed, buildings]);

  // 2. Filter Top Buildings (Real structures ONLY)
  const topBuildings = useMemo(() => {
    return relevantData
      .slice(0, 15);
  }, [relevantData]);

  // 3. Significant objects for the era
  const significantForEra = useMemo(() => {
    const topIds = new Set(topBuildings.map(b => b.id));
    const modernSignificant = [
      'sagrada-familia', 'ryugyong', 'baiterek', 'burj-al-arab', 'capital-gate', 
      'lotus-temple', 'sydney-opera', 'ukraina-hotel', 
      'space-needle', 'us-capitol', 'msu', 'brooklyn-bridge', 'belem-tower', 'sydney-tower', 'cn-tower', 'luxor'
    ];
    
    return relevantData
      .filter(b => !topIds.has(b.id)) // Exclude top 15
      .filter(b => {
        if (modernSignificant.includes(b.id)) return true;
        if (['Ancient', 'Gothic', 'Statue', 'Engineering'].includes(b.category)) return true;
        return false;
      })
      .map(b => ({ b, diff: Math.abs(currentYear - b.yearBuilt) }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 6)
      .map(item => item.b);
  }, [relevantData, topBuildings, currentYear]);

  const filteredLibrary = useMemo(() => {
    return buildings.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || 
                              (categoryFilter === 'Russia' && ((Array.isArray(b.countryCode) ? b.countryCode.includes('ru') : b.countryCode === 'ru') || b.location.toLowerCase().includes('россия'))) ||
                              b.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.height - a.height);
  }, [searchQuery, categoryFilter, buildings]);

  const getFixedAnalysis = (year: number, building: Building) => {
    if (year > 2026) return "Мы устремляемся в будущее. Границы инженерных возможностей расширяются: мегаструктуры до самых небес, новые материалы и утопические города-башни. Многие из этих амбициозных проектов пока остались концептами, но не исключено, что к 2100 году человечество решит воплотить их в жизнь. Количество небоскребов по всему миру растет в геометрической прогрессии, и архитектура становится не только выше, но и экологичнее.";
    if (year < 1000) return `В эпоху античности ${building.name} поражает воображение: его высота составляет целых ${building.height} м! Это настоящий триумф инженерной мысли древности.`;
    if (year < 1800) return `В ${year} году небеса покоряет ${building.name} (${building.height} м). В Средневековье и эпоху Возрождения архитектура стремилась выразить духовное величие и силу.`;
    if (year < 1930) return `Индустриальная эпоха. На дворе ${year} год, и ${building.name} устремляется ввысь на ${building.height} м. Новые материалы — сталь и бетон — открывают путь к современным сооружениям.`;
    if (year < 2000) return `Новое время и новые амбиции. В ${year} году символом технологического прогресса и экономической мощи является ${building.name} (${building.height} м).`;
    return `В ${year} году пределов для строительства уже нет. ${building.name} достигает головокружительных ${building.height} метров, доказывая, что человек всегда будет тянуться к звездам.`;
  };

  const handleAiNarrative = async () => {
    if (currentYear > 2026) {
      setIsAnalyzing(true);
      setAiAnalysis(null);
      setTimeout(() => {
        setAiAnalysis(getFixedAnalysis(currentYear, FUTURE_BUILDINGS[0]));
        setIsAnalyzing(false);
      }, 800);
      return;
    }
    const currentLeader = topBuildings[0];
    if (!currentLeader) return;
    setIsAnalyzing(true);
    setAiAnalysis(null);
    
    // Simulate a small delay for UI effect
    setTimeout(() => {
      setAiAnalysis(getFixedAnalysis(currentYear, currentLeader));
      setIsAnalyzing(false);
    }, 800);
  };

  const categories = ['all', 'Russia', 'Ancient', 'Gothic', 'Industrial', 'Modern', 'Engineering', 'Statue', 'Mast'];
  const categoryTranslations: Record<string, string> = {
    'all': 'Все категории',
    'Russia': '🇷🇺 Только Россия',
    'Ancient': 'Древние',
    'Gothic': 'Готика',
    'Industrial': 'Индустриальные',
    'Modern': 'Современные',
    'Engineering': 'Инженерные',
    'Statue': 'Статуи',
    'Mast': 'Мачты и вышки'
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex flex-col">
        <div className="px-3 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="flex w-full md:w-auto items-center justify-between gap-2 md:gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Rocket className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold font-serif leading-none tracking-tight">Архитектурные Гиганты</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Database className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Общая база: {buildings.length}</span>
                </div>
              </div>
            </div>
            
            <div className="md:hidden flex items-center shrink-0">
              <div className="px-3 py-1.5 bg-slate-900 border border-amber-500/30 rounded-full text-base font-black text-amber-400 font-serif min-w-[80px] text-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                {currentYear < 0 ? `${Math.abs(currentYear)} до н.э.` : (currentYear === 0 ? `1 н.э.` : `${currentYear} год`)}
              </div>
            </div>
          </div>
          
          <div className="flex w-full md:w-auto justify-center flex-none items-center">
            <div className="flex w-full md:w-auto bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button onClick={() => setActiveTab('explore')} className={`flex-1 md:flex-none px-2 md:px-4 py-1.5 rounded-lg text-[11px] md:text-sm font-bold transition-all ${activeTab === 'explore' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}>Таймлайн</button>
              <button onClick={() => setActiveTab('library')} className={`flex-1 md:flex-none px-2 md:px-4 py-1.5 rounded-lg text-[11px] md:text-sm font-bold transition-all ${activeTab === 'library' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}>Архив</button>
              <button onClick={() => setActiveTab('about')} className={`flex-1 md:flex-none px-2 md:px-4 py-1.5 rounded-lg text-[11px] md:text-sm font-bold transition-all ${activeTab === 'about' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}>О проекте</button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <div className="px-5 py-2.5 bg-slate-900 border border-amber-500/30 rounded-full text-2xl font-black text-amber-400 font-serif min-w-[140px] text-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              {currentYear < 0 ? `${Math.abs(currentYear)} до н.э.` : (currentYear === 0 ? `1 н.э.` : `${currentYear} год`)}
            </div>
          </div>
        </div>
        
        {activeTab === 'explore' && (
          <div className="w-full bg-slate-950/80 border-t border-slate-800 p-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <TimelineSlider value={currentYear} onChange={setCurrentYear} />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        {activeTab === 'about' && <AboutSection />}
        
        {activeTab === 'explore' && (
          <div className="space-y-12 md:space-y-16">
            <section className="space-y-8 md:space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Эпоха {currentYear < 0 ? `${Math.abs(currentYear)} г. до н.э.` : `${currentYear} г.`}</h2>
                <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                   <button onClick={() => setShowDestroyed(!showDestroyed)} className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${showDestroyed ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'}`}>
                    {showDestroyed ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    Утраченные
                  </button>
                  <button onClick={handleAiNarrative} disabled={isAnalyzing} className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 rounded-full font-black uppercase text-xs transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50">
                    <Sparkles className="w-4 h-4" /> {isAnalyzing ? 'Анализ...' : 'Анализ Эпохи'}
                  </button>
                </div>
              </div>

              {aiAnalysis && (
                <div className="p-6 md:p-8 bg-slate-900 border-l-4 border-amber-500 rounded-r-3xl flex flex-col sm:flex-row gap-4 md:gap-6 animate-in zoom-in-95 shadow-2xl">
                  <Globe className="w-8 h-8 md:w-10 md:h-10 text-amber-500 shrink-0" />
                  <p className="text-slate-200 italic font-medium text-base md:text-lg leading-relaxed">{aiAnalysis}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8">
                {currentYear > 2026 ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <List className="w-6 h-6 text-emerald-500" />
                      <h3 className="text-2xl font-serif font-bold text-white">Будущее архитектуры: грандиозные концепты</h3>
                      <div className="h-px bg-slate-800 flex-1 ml-4"></div>
                    </div>
                    <p className="text-slate-400 italic mb-8 leading-relaxed">
                      Здесь представлены наиболее известные проекты и строящиеся объекты, реализация которых ожидается или могла бы состояться до конца XXI века. Многие из этих амбициозных мегаструктур не были реализованы из-за феноменальной сложности, но не исключено, что к 2100 году, при новых технологиях, люди к ним вернутся. В целом нас ждет бурный рост мегаполисов: по прогнозам, количество небоскребов увеличится в разы, а здания станут более экологичными и футуристичными.
                    </p>
                    {FUTURE_BUILDINGS.sort((a,b) => b.height - a.height).map((building, idx) => (
                      <BuildingCard 
                        key={`future-${idx}`} 
                        building={building} 
                        rank={idx + 1} 
                        isActive={idx === 0} 
                        currentYear={currentYear} 
                      />
                    ))}
                  </div>
                ) : currentYear === 2026 ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <List className="w-6 h-6 text-amber-500" />
                      <h3 className="text-2xl font-serif font-bold text-white">Топ-200 самых высоких сооружений мира на сегодняшний день</h3>
                      <div className="h-px bg-slate-800 flex-1 ml-4"></div>
                    </div>
                    {TOP_200.map((item, idx) => {
                      if (item.inApp) {
                        const building = buildings.find(b => b.name === item.name);
                        if (building) {
                          return (
                            <BuildingCard 
                              key={`top200-${idx}`} 
                              building={building} 
                              rank={idx + 1} 
                              isActive={idx === 0} 
                              currentYear={currentYear} 
                            />
                          );
                        }
                      }
                      return (
                        <div key={`top200-${idx}`} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-400">
                          <div className="flex items-center gap-4 truncate">
                            <span className="text-lg font-bold opacity-50 w-8">{idx + 1}.</span>
                            <span className="truncate text-lg">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-lg font-mono">{item.height} м</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : topBuildings.length > 0 ? topBuildings.map((building, idx) => (
                  <BuildingCard 
                    key={building.id} 
                    building={building} 
                    rank={idx + 1} 
                    isActive={idx === 0} 
                    currentYear={currentYear} 
                  />
                )) : (
                  <div className="p-20 text-center border-2 border-dashed border-slate-800 rounded-3xl opacity-50">
                    <Info className="w-12 h-12 mx-auto mb-4" />
                    <p className="text-xl">В этот период гигантские постройки еще не зафиксированы.</p>
                  </div>
                )}
              </div>
            </section>

            {currentYear < 2026 && significantForEra.length > 0 && (
              <section className="space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  <h3 className="text-2xl font-serif font-bold text-white">Значимые объекты эпохи</h3>
                  <div className="h-px bg-slate-800 flex-1 ml-4"></div>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  {significantForEra.map((b) => (
                    <BuildingCard 
                      key={b.id} 
                      building={b} 
                      isActive={false}
                      currentYear={currentYear}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="bg-slate-900/30 p-4 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-800 h-[300px] md:h-[400px] overflow-hidden">
              <HeightChart currentYear={currentYear} />
            </section>
          </div>
        )}

        {activeTab === 'library' && (
          <section className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Мастер-Архив</h2>
                <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  Полная коллекция из <strong className="text-amber-500">{buildings.length}</strong> сооружений. Здесь собраны не только современные рекордсмены-небоскрёбы, но и самые значимые исторические и культурные объекты всех эпох. Доступны фотографии, описания и интересные факты о каждом из них.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                <input type="text" placeholder="Поиск по названию или локации..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl outline-none focus:border-amber-500/50 transition-all font-medium placeholder:text-slate-600 text-base" />
              </div>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl cursor-pointer outline-none focus:border-amber-500/50 appearance-none font-medium text-base">
                {categories.map(c => <option key={c} value={c}>{categoryTranslations[c] || c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {filteredLibrary.map((b, idx) => (
                <BuildingCard 
                  key={b.id} 
                  building={b} 
                  rank={idx + 1} 
                  isActive={false} 
                  currentYear={currentYear} 
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pb-10">
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <div className="text-center md:text-left leading-relaxed">
            &copy; 2026. Проект создан VAC: Гоша Сарибекян и Миша Сарибекян.<br className="md:hidden" /> Другие наши проекты здесь - <a href="https://v-a-c.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors underline underline-offset-4 decoration-slate-700">v-a-c.xyz</a>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-medium">
            <button onClick={() => {
              setActiveTab('about');
              window.scrollTo(0, 0);
            }} className="hover:text-amber-500 transition-colors">Как поддержать проект</button>
            <a href="https://t.me/zeppman86" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">Связаться с нами</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;