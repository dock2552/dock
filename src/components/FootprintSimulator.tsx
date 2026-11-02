import { useState } from 'react';
import { Eye, ShieldAlert, Sparkles, TrendingDown, TrendingUp, Info } from 'lucide-react';

interface ClusterLevel {
  price: number;
  bid: number;
  ask: number;
  isPoc?: boolean;
  askImbalance?: boolean;
  bidImbalance?: boolean;
  annotation?: string;
}

interface Scenario {
  id: string;
  name: string;
  type: 'SHORT_ABSORPTION' | 'LONG_ABSORPTION' | 'STACKED_MOMENTUM';
  subtitle: string;
  badge: string;
  candleType: 'BEARISH_WICK' | 'BULLISH_WICK' | 'STRONG_BEAR';
  high: number;
  low: number;
  open: number;
  close: number;
  pocPrice: number;
  totalVolume: string;
  delta: string;
  levels: ClusterLevel[];
  takeaway: string;
  action: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: '1',
    name: 'Абсорбція на піку (Trapped Buyers — Шорт)',
    type: 'SHORT_ABSORPTION',
    subtitle: 'Зняття хаю, масова купівля натовпу в айсберг і червоне закриття свічки',
    badge: 'Ключовий сигнал Dementor',
    candleType: 'BEARISH_WICK',
    high: 68450,
    low: 67820,
    open: 68100,
    close: 67890,
    pocPrice: 68400,
    totalVolume: '842 BTC',
    delta: '-128 BTC (Від\'ємна дельта при тесті хаю)',
    takeaway: 'На самому піку тіні свічки ритейл купив 245 BTC за ринком, вважаючи це пробоєм. Однак лімітний айсберг продавця зупинив рух, і свічка закрилася червоною нижче рівня.',
    action: 'Шорт при поверненні ціни під рівень зняття. Стоп за 68,460. Тейк-профіт на 67,200.',
    levels: [
      { price: 68450, bid: 12, ask: 185, askImbalance: true, annotation: 'Екстремум тіні: агресивні Market Buy впираються в лімітну стіну' },
      { price: 68400, bid: 28, ask: 245, isPoc: true, askImbalance: true, annotation: 'POC свічки в самій верхівці тіні! Поглинання покупців (Trapped Buyers)' },
      { price: 68300, bid: 45, ask: 130, askImbalance: false },
      { price: 68200, bid: 60, ask: 75, isPoc: false },
      { price: 68100, bid: 95, ask: 54, isPoc: false, annotation: 'Ціна відкриття свічки (Open)' },
      { price: 68000, bid: 140, ask: 35, bidImbalance: true, annotation: 'Продавці починають перехоплювати ініціативу' },
      { price: 67890, bid: 190, ask: 22, bidImbalance: true, annotation: 'Закриття свічки (Close) біля самого мінімуму' },
      { price: 67820, bid: 55, ask: 14, isPoc: false }
    ]
  },
  {
    id: '2',
    name: 'Абсорбція на дні (Trapped Sellers — Лонг)',
    type: 'LONG_ABSORPTION',
    subtitle: 'Вибивання стопів під локальним мінімумом, викуп айсбергом та зелене закриття',
    badge: 'Розворот від VAL / EQL',
    candleType: 'BULLISH_WICK',
    high: 67350,
    low: 66600,
    open: 66850,
    close: 67280,
    pocPrice: 66650,
    totalVolume: '960 BTC',
    delta: '+215 BTC (Потужне бичаче поглинання)',
    takeaway: 'Панічні продажі роздробу під рівнем 66,700 були повністю викуплені великим гравцем. На Footprint видно колосальний об\'єм продажів на самому дні тіні, після чого свічка злетіла вгору.',
    action: 'Лонг на поверненні в Value Area. Стоп за 66,580. Тейк на POC діапазону.',
    levels: [
      { price: 67350, bid: 35, ask: 90, isPoc: false, annotation: 'Максимум свічки (High)' },
      { price: 67280, bid: 40, ask: 145, askImbalance: true, annotation: 'Закриття свічки (Close) на максимумі' },
      { price: 67100, bid: 55, ask: 120, askImbalance: true },
      { price: 66950, bid: 70, ask: 85, isPoc: false },
      { price: 66850, bid: 80, ask: 65, isPoc: false, annotation: 'Ціна відкриття (Open)' },
      { price: 66750, bid: 160, ask: 42, bidImbalance: true },
      { price: 66650, bid: 310, ask: 38, isPoc: true, bidImbalance: true, annotation: 'POC на самому дні! Пастка продавців (Trapped Sellers)' },
      { price: 66600, bid: 220, ask: 15, bidImbalance: true, annotation: 'Мінімум тіні свічки: стоп-хант під рівнем' }
    ]
  },
  {
    id: '3',
    name: 'Stacked Selling Imbalances (Імпульсний пробій)',
    type: 'STACKED_MOMENTUM',
    subtitle: 'Стек із 3+ поспіль червоних дисбалансів продавців при зламі структури (CHoCH)',
    badge: 'Підтвердження тренду',
    candleType: 'STRONG_BEAR',
    high: 68100,
    low: 67300,
    open: 68050,
    close: 67340,
    pocPrice: 67600,
    totalVolume: '1,240 BTC',
    delta: '-540 BTC (Агресивний маркет-продаж)',
    takeaway: 'Каскадні ринкові продажі без жодного спротиву лімітних покупців. Стек червоних дисбалансів понад 300% підтверджує істинність зламу структури.',
    action: 'Вхід на слабкому корекційному ретесті до зони Stacked Imbalance (67,700).',
    levels: [
      { price: 68100, bid: 15, ask: 40, isPoc: false },
      { price: 67900, bid: 110, ask: 25, bidImbalance: true, annotation: 'Початок лавини продажів' },
      { price: 67800, bid: 215, ask: 35, bidImbalance: true, annotation: 'Стек дисбалансу 1 (Bid > 600% Ask)' },
      { price: 67700, bid: 280, ask: 48, bidImbalance: true, annotation: 'Стек дисбалансу 2 (Зона майбутнього опору)' },
      { price: 67600, bid: 340, ask: 55, isPoc: true, bidImbalance: true, annotation: 'POC імпульсу + Стек дисбалансу 3' },
      { price: 67450, bid: 190, ask: 40, bidImbalance: true },
      { price: 67340, bid: 130, ask: 20, isPoc: false, annotation: 'Впевнене закриття на дні свічки' },
      { price: 67300, bid: 50, ask: 12, isPoc: false }
    ]
  }
];

export function FootprintSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('1');
  const [hoveredLevel, setHoveredLevel] = useState<ClusterLevel | null>(null);

  const currentScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Інтерактивний тренажер Order Flow
            </span>
            <span className="text-xs text-slate-400 font-mono">Footprint (Bid × Ask)</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Анатомія Кластерної Свічки Dementor
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Подивіться, як великий гравець наповнює позицію за лаштунками звичайної японської свічки
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioId(s.id);
                setHoveredLevel(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                activeScenarioId === s.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              {s.type === 'SHORT_ABSORPTION' && <TrendingDown className="w-3.5 h-3.5" />}
              {s.type === 'LONG_ABSORPTION' && <TrendingUp className="w-3.5 h-3.5" />}
              {s.type === 'STACKED_MOMENTUM' && <ShieldAlert className="w-3.5 h-3.5" />}
              {s.name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Overview Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{currentScenario.name}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {currentScenario.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{currentScenario.subtitle}</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">ОБ'ЄМ СВІЧКИ</span>
            <span className="text-slate-200 font-semibold">{currentScenario.totalVolume}</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 block text-[10px]">ДЕЛЬТА БАРУ</span>
            <span className={currentScenario.delta.includes('-') ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
              {currentScenario.delta.split(' ')[0]} {currentScenario.delta.split(' ')[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Candlestick + Footprint Matrix + Deep Analysis */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Footprint Candle Cluster Table */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
            <span className="w-24 text-left font-bold text-rose-400">BID (Продажі)</span>
            <span className="w-20 text-center text-slate-300 font-bold">ЦІНА $</span>
            <span className="w-24 text-right font-bold text-emerald-400">ASK (Покупки)</span>
            <span className="hidden sm:inline w-28 text-right text-slate-500">СТАТУС</span>
          </div>

          <div className="mt-2 space-y-1.5">
            {currentScenario.levels.map((lvl) => {
              const isHovered = hoveredLevel?.price === lvl.price;
              return (
                <div
                  key={lvl.price}
                  onMouseEnter={() => setHoveredLevel(lvl)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className={`group flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-all ${
                    lvl.isPoc
                      ? 'bg-amber-500/15 border border-amber-500/50 shadow-sm'
                      : isHovered
                      ? 'bg-slate-800 border border-slate-700'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  {/* Bid side */}
                  <div className="w-24 flex items-center gap-1.5">
                    <div
                      className={`text-right font-bold px-2 py-0.5 rounded ${
                        lvl.bidImbalance
                          ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-sm'
                          : 'text-slate-300'
                      }`}
                    >
                      {lvl.bid}
                    </div>
                    {lvl.bidImbalance && (
                      <span className="text-[9px] text-rose-400 font-semibold uppercase">300%+</span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="w-20 text-center font-bold flex items-center justify-center gap-1">
                    <span className={lvl.isPoc ? 'text-amber-300' : 'text-slate-200'}>
                      ${lvl.price.toLocaleString()}
                    </span>
                    {lvl.isPoc && (
                      <span className="px-1 py-0.2 text-[9px] bg-amber-500 text-slate-950 font-extrabold rounded">
                        POC
                      </span>
                    )}
                  </div>

                  {/* Ask side */}
                  <div className="w-24 flex items-center justify-end gap-1.5">
                    {lvl.askImbalance && (
                      <span className="text-[9px] text-emerald-400 font-semibold uppercase">300%+</span>
                    )}
                    <div
                      className={`text-left font-bold px-2 py-0.5 rounded ${
                        lvl.askImbalance
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'text-slate-300'
                      }`}
                    >
                      {lvl.ask}
                    </div>
                  </div>

                  {/* Status / Tag */}
                  <div className="hidden sm:flex w-28 justify-end text-[10px]">
                    {lvl.annotation ? (
                      <span className="text-slate-400 truncate text-right max-w-[110px]" title={lvl.annotation}>
                        {lvl.annotation}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footprint Legend */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
              <span>Point of Control (POC)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></span>
              <span>Ask Imbalance (&gt;300%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500"></span>
              <span>Bid Imbalance (&gt;300%)</span>
            </div>
          </div>
        </div>

        {/* Right side: Interactive Explanation & Setup Trigger */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Active Level Hover Detail Box */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              Аналіз рівня під курсором
            </h4>
            {hoveredLevel ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Ціновий рівень:</span>
                  <span className="text-sm font-mono font-bold text-white">
                    ${hoveredLevel.price.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Ринкові продажі (Bid)</span>
                    <span className="text-rose-400 font-bold">{hoveredLevel.bid} BTC</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Ринкові покупки (Ask)</span>
                    <span className="text-emerald-400 font-bold">{hoveredLevel.ask} BTC</span>
                  </div>
                </div>
                {hoveredLevel.annotation && (
                  <div className="p-2.5 rounded bg-slate-900/90 border border-emerald-500/20 text-xs text-emerald-300">
                    {hoveredLevel.annotation}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-3 text-center">
                Наведіть курсор на будь-який рядок кластера зліва, щоб побачити діагностику ордерів
              </p>
            )}
          </div>

          {/* Core Lesson from Video */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex-1">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Що саме бачить трейдер Dementor:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentScenario.takeaway}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <h5 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Eye className="w-3 h-3 text-amber-400" />
                Торгова дія за алгоритмом:
              </h5>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                {currentScenario.action}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
