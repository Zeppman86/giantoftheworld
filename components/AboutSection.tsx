import React, { useState } from 'react';
import { BookOpen, Ruler, ArrowUpToLine, Building2, Radio, Heart, Copy, CheckCircle2, Coffee, MessageCircle, PersonStanding, Globe, Rocket, X } from 'lucide-react';
import { BUILDINGS } from '../data';

export const AboutSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showTop200, setShowTop200] = useState(false);
  const [expandedQr, setExpandedQr] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('+79067017425');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-serif font-bold flex items-center justify-center gap-4">
          <BookOpen className="w-10 h-10 text-amber-500" />
          О проекте
        </h2>
        <p className="text-slate-400 text-lg">История создания и правила измерений</p>
      </div>

      {/* Intro & Donation Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-amber-500/20 p-8 rounded-3xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-amber-500" />
            Больше, чем просто метры
          </h3>
          <p className="text-slate-300 leading-relaxed text-xl font-medium">
            Здесь не просто сухой топ мировых высоток! Мы собрали <strong className="text-white">около 200 величайших инженерных чудес</strong> всех эпох — от пирамид до концептов городов будущего. Это приложение создано, чтобы увлечь архитектурой как взрослых, так и детей!
          </p>
          <p className="text-slate-400 leading-relaxed text-lg">
            В базе есть небольшой географический перекос: мы добавили больше знаковых объектов России (храмы, МГУ, Родину-мать), чтобы изучать историю на самых близких и знакомых примерах.
          </p>
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl space-y-6">
        <h3 className="text-2xl font-serif font-bold flex items-center gap-3 mb-6">
          <Ruler className="w-6 h-6 text-amber-500" />
          Правила проекта
        </h3>
        <p className="text-slate-300 leading-relaxed text-lg">
          В мире существует официальная организация — <strong>Совет по высотным зданиям и городской среде (CTBUH)</strong>. Именно они решают, какое здание выше, и устанавливают строгие правила измерения.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-lg font-bold mb-2 text-white">Как отсортированы карточки?</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              В каждом году, который вы выбираете на таймлайне, все сооружения сортируются строго по своей высоте: <strong>от самых высоких к самым низким</strong>. Так сразу видно действующего рекордсмена.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-lg font-bold mb-2 text-white">Что значит статус «Утрачено»?</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Это значит, что сооружение больше не существует (было разрушено или разобрано). Фотографии для таких древних объектов, естественно, отсутствуют, поэтому мы используем <strong>современные реконструкции, картины или фото сохранившихся руин</strong>, чтобы можно было представить их масштаб.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-lg font-bold mb-2 text-white">1. Здания</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Главное правило: минимум 50% высоты должно состоять из обитаемых этажей (офисы, квартиры). Измеряются по архитектурной высоте.
            </p>
            <div className="flex gap-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/500px-Burj_Khalifa.jpg" className="w-full h-full object-cover" alt="Бурдж-Халифа" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Бурдж-Халифа</span>
                </div>
              </div>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/500px-Empire_State_Building_%28aerial_view%29.jpg" className="w-full h-full object-cover" alt="Эмпайр-стейт-билдинг" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Эмпайр-стейт</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <Radio className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-lg font-bold mb-2 text-white">2. Свободностоящие башни</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Сооружения без тросов, где обитаемая часть меньше 50%. Их главная цель — телекоммуникации. Измеряются до самого кончика антенны.
            </p>
            <div className="flex gap-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ostankino_Tower%2C_2015.JPG/500px-Ostankino_Tower%2C_2015.JPG" className="w-full h-full object-cover" alt="Останкинская телебашня" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Останкино</span>
                </div>
              </div>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tokyo_Sky_Tree_2012.JPG/500px-Tokyo_Sky_Tree_2012.JPG" className="w-full h-full object-cover" alt="Токио Скайтри" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Токио Скайтри</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <ArrowUpToLine className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-lg font-bold mb-2 text-white">3. Мачты на оттяжках</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Инженерные сооружения, которые поддерживаются стальными тросами.
            </p>
            <div className="flex gap-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Maszt_radiowy_w_Konstantynowie.jpg/960px-Maszt_radiowy_w_Konstantynowie.jpg" className="w-full h-full object-cover" alt="Варшавская радиомачта" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Варшавская мачта</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <PersonStanding className="w-5 h-5 text-amber-500" />
            </div>
            <h4 className="text-lg font-bold mb-2 text-white">4. Статуи и монументы</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Измеряются от уровня земли (или основания пьедестала) до самой высокой точки фигуры.
            </p>
            <div className="flex gap-2">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/500px-Statue_of_Unity.jpg" className="w-full h-full object-cover" alt="Статуя Единства" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Статуя Единства</span>
                </div>
              </div>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group">
                <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/5/56/Mother_Ukraine_2023.JPG/500px-Mother_Ukraine_2023.JPG" className="w-full h-full object-cover" alt="Родина-мать (Киев)" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white text-center leading-tight">Родина-мать</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 md:col-span-2 mt-8">
            <h4 className="text-2xl font-serif font-bold text-white mb-6">Как исследовать этот мир?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <h5 className="text-lg font-bold text-white">Таймлайн (Машина времени)</h5>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Перемещайте ползунок внизу экрана, чтобы путешествовать сквозь века! Вы увидите, как 10 тысяч лет назад люди строили первые башни из камня, как египетские пирамиды на 4000 лет стали абсолютными рекордсменами, и как в 19 веке сталь и стекло позволили возвести первые небоскребы. Это настоящая архитектурная эволюция в реальном времени.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                </div>
                <h5 className="text-lg font-bold text-white">Архив (Все гиганты)</h5>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Хотите увидеть всех сразу? Добро пожаловать в Архив! Здесь собраны абсолютно все сооружения из нашей базы данных. Вы можете отсортировать их по высоте, возрасту или искать конкретные места. Идеально для подготовки к урокам истории или просто для расширения кругозора. Картинки можно приближать!
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-500" />
                </div>
                <h5 className="text-lg font-bold text-white">Взгляд в будущее</h5>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Что люди построят завтра? В самом конце нашего таймлайна (кнопка «Будущее») скрываются грандиозные проекты, которые сейчас строятся или существуют только на бумаге. Города в гигантских пирамидах, космические лифты и километровые башни. Человеческая фантазия не имеет границ!
                </p>
              </div>

            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 md:col-span-2">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <Coffee className="w-5 h-5 text-emerald-500" />
            </div>
            <h4 className="text-lg font-bold mb-2 text-white">Почему они все вместе?</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Официально телебашни, статуи и небоскребы не соревнуются друг с другом. Но в нашем приложении мы их объединили! Почему? Чтобы показать <strong>невероятный масштаб человеческих амбиций</strong>. Очень интересно наблюдать, как древние пирамиды соревнуются по высоте с современными телевышками, а гигантские статуи возвышаются над средневековыми соборами!
            </p>

            <div className="h-px w-full bg-slate-800 mb-6"></div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2 text-white">Обновление 2026 года</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Мы добавили в нашу базу данных <strong>200 самых высоких актуальных строений прямо сейчас</strong>! Теперь вы можете исследовать не только исторические рекорды и чудеса света, но и современные сверхвысокие небоскребы Азии, Ближнего Востока и Америки, которые формируют облик нашей планеты в 2026 году.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Support & About Authors Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-amber-500/20 p-8 rounded-3xl space-y-8 relative overflow-hidden mt-8">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-amber-500 fill-amber-500/50" />
            О создании и создателях
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg">
            Привет! Я Гоша. Я начал делать этот проект в феврале 2026 года для своего сына Миши, потому что он интересуется историей, архитектурой и просто большими строениями. 
          </p>
          <p className="text-slate-300 leading-relaxed text-lg">
            К сентябрю 2026 года я считаю его достаточно полным, чтобы показать миру. Многие идеи здесь — как раз Мишины, поэтому я полноценно указываю его в титрах, несмотря на возраст 7 лет. Я создал сайт, куда буду выкладывать другие проекты — <a href="https://v-a-c.xyz" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-amber-500/30 transition-colors">v-a-c.xyz</a>.
          </p>
        </div>

        <div className="relative z-10 bg-slate-950/50 p-6 sm:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm mt-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-1 space-y-6 w-full">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Поддержать проект</h3>
                <p className="text-slate-400 text-sm">Приложение доступно бесплатно, но мы будем рады любой поддержке!</p>
              </div>
              
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-400 mb-1">Перевод по СБП (Сбербанк или Т-Банк)</p>
                <p className="text-2xl font-mono font-bold text-white tracking-wider mb-1">+7 906 701-74-25</p>
                <p className="text-xs text-amber-500 mb-5">Получатель: Георгий</p>
                
                <button
                  onClick={handleCopy}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold uppercase text-xs transition-all ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'}`}
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Скопирован' : 'Скопировать номер'}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://v-a-c.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 text-white hover:text-amber-400 bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase border border-slate-700"
                >
                  <Globe className="w-5 h-5" />
                  Наш сайт
                </a>
                <a 
                  href="https://instagram.com/vibeandcoding" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase border border-pink-500/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inst @vibeandcoding
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-end shrink-0 gap-4 mt-6 md:mt-0">
              <div className="flex flex-col items-center gap-3">
                <div 
                  className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center w-[140px] h-[140px] relative group cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setExpandedQr("https://v-a-c.xyz/qr2.png")}
                >
                  <img 
                    src="https://v-a-c.xyz/qr2.png" 
                    alt="QR-код CloudTips" 
                    className="w-full h-full object-contain pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CloudTips</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div 
                  className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center w-[140px] h-[140px] relative group cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setExpandedQr("https://v-a-c.xyz/qr.png")}
                >
                  <img 
                    src="https://v-a-c.xyz/qr.png" 
                    alt="QR-код Т-Банк" 
                    className="w-full h-full object-contain pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Т-Банк</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {expandedQr && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setExpandedQr(null)}
        >
          <div 
            className="relative bg-white p-6 rounded-3xl max-w-sm w-full animate-in zoom-in-95 duration-200 shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedQr(null)}
              className="absolute -top-14 right-0 md:-right-14 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            <img src={expandedQr} alt="QR Code Enlarged" className="w-full h-auto object-contain rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
};
