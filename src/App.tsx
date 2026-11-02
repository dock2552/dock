import { useState } from 'react';
import {
  FileText,
  FileDown,
  Download,
  Layers,
  Crosshair,
  BarChart3,
  Calculator,
  Sliders,
  CheckSquare,
  PlayCircle,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { FootprintSimulator } from './components/FootprintSimulator';
import { SetupsExplorer } from './components/SetupsExplorer';
import { RiskCalculator } from './components/RiskCalculator';
import { TerminalSettings } from './components/TerminalSettings';
import { DailyChecklist } from './components/DailyChecklist';
import { VideoKnowledgeBase } from './components/VideoKnowledgeBase';
import { DocumentViewer } from './components/DocumentViewer';
import { generateWordDocument } from './utils/docxGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      const blob = await generateWordDocument();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Dementor_CME_Логіка_Торгівлі.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Огляд & Алгоритм', icon: Layers },
    { id: 'setups', label: '4 Торгові Сетапи', icon: Crosshair },
    { id: 'footprint', label: 'Footprint Симулятор', icon: BarChart3 },
    { id: 'calculator', label: 'Калькулятор Ризику', icon: Calculator },
    { id: 'terminals', label: 'Софт & Індикатори', icon: Sliders },
    { id: 'checklist', label: 'Чек-лист Дня', icon: CheckSquare },
    { id: 'videos', label: '17 Відео Dementor', icon: PlayCircle },
    { id: 'document', label: 'Документ (.txt & Word)', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-mono font-black text-slate-950 text-base">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-mono">
                  DEMENTOR // CME ALGO
                </span>
                <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  17 Відео
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Кластерний аналіз • Footprint • Об'ємний профіль • Дельта
              </span>
            </div>
          </div>

          {/* Quick Header Export Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/логіка торгівлі.txt"
              download="логіка торгівлі.txt"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>.TXT</span>
            </a>

            <button
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Завантажити Word (.docx)</span>
              <span className="sm:hidden">.DOCX</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center space-x-1 py-1.5 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Повний Аналіз 17 Відео Трейдера Dementor (@Dem6ntor)
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Алгоритм Прибуткової Торгівлі за Ордерфлоу та Кластерами
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Повна систематизація торгової логіки: як читати ринковий аукціон замість випадкових ліній, знаходити пастки маркет-мейкера через Footprint (кластери Bid/Ask), торгувати гепи CME та Naked POC і суворо контролювати ризик без загрози ліквідації.
                </p>

                {/* Quick action buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('setups')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Переглянути 4 Сетапи</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('document')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Відкрити «логіка торгівлі.txt»</span>
                  </button>

                  <button
                    onClick={handleDownloadDocx}
                    disabled={isExportingDocx}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Експорт у Word (.docx)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* The 5-Step Core Engine */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <div className="pb-4 border-b border-slate-800">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  Залізне правило входу
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  П'ятиетапний Ланцюжок Алгоритму Dementor
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Жодна угода не відкривається, якщо хоча б одна ланка ланцюжка відсутня
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  {
                    step: '01',
                    title: 'HTF Контекст',
                    desc: '1D/4H рівні ліквідності, Value Area (VAH/VAL), Naked POC та гепи CME.',
                    color: 'text-blue-400',
                    border: 'border-blue-500/30'
                  },
                  {
                    step: '02',
                    title: 'Маніпуляція (Sweep)',
                    desc: 'Імпульсний прокол рівня (EQH/EQL, Asia High/Low) зі збиттям стоп-лосів.',
                    color: 'text-rose-400',
                    border: 'border-rose-500/30'
                  },
                  {
                    step: '03',
                    title: 'Кластерна Абсорбція',
                    desc: 'На піку свічки Footprint показує вхід натовпу в лімітний айсберг великого гравця.',
                    color: 'text-amber-400',
                    border: 'border-amber-500/30'
                  },
                  {
                    step: '04',
                    title: 'Дивергенція Дельти',
                    desc: 'CVD показує явне виснаження: ціна оновила хай, а дельта ринкових покупок падає.',
                    color: 'text-purple-400',
                    border: 'border-purple-500/30'
                  },
                  {
                    step: '05',
                    title: 'Вхід на поверненні',
                    desc: 'Вхід на закритті всередину Value Area або ретесті CHoCH з коротким стопом.',
                    color: 'text-emerald-400',
                    border: 'border-emerald-500/30'
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`bg-slate-950 p-4 rounded-xl border ${item.border} flex flex-col justify-between`}
                  >
                    <div>
                      <span className={`text-xs font-mono font-bold ${item.color}`}>
                        КРОК {item.step}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Pillars of Edge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Об'ємний Профіль & TPO</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  80% часу ринок ротується всередині зони вартості (Value Area 68.2%). Торгівля будується від країв діапазону (VAL/VAH) до Point of Control (POC), а не на хаотичних пробоях.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Footprint & Айсберги</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Кластери показують боротьбу Bid x Ask. Коли ви бачите великий зелений кластер покупок у верхньому хвості свічки, а свічка закривається червоною — це гарантована пастка покупців (Trapped Buyers).
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Математика без Ліквідацій</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Суворий ризик 1% на угоду. Стоп виставляється миттєво в біржовий стакан. Доливка в збитковий мінус заборонена. Переведення в БЕЗЗБИТОК — суворо після фіксації першої цілі (TP1 40%).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SETUPS TAB */}
        {activeTab === 'setups' && <SetupsExplorer />}

        {/* FOOTPRINT TAB */}
        {activeTab === 'footprint' && <FootprintSimulator />}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && <RiskCalculator />}

        {/* TERMINALS TAB */}
        {activeTab === 'terminals' && <TerminalSettings />}

        {/* CHECKLIST TAB */}
        {activeTab === 'checklist' && <DailyChecklist />}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && <VideoKnowledgeBase />}

        {/* DOCUMENT TAB */}
        {activeTab === 'document' && <DocumentViewer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            Стратегічний посібник за відео-матеріалами <strong className="text-slate-300">Dementor (@Dem6ntor / dementor.cme)</strong>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/логіка торгівлі.txt"
              download="логіка торгівлі.txt"
              className="text-emerald-400 hover:underline"
            >
              Завантажити логіка торгівлі.txt
            </a>
            <button
              onClick={handleDownloadDocx}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Завантажити Word (.docx)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
