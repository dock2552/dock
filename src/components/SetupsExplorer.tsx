import { useState } from 'react';
import { SETUPS_DATA, TradeSetup } from '../data/tradingData';
import { CheckCircle2, ChevronRight, Crosshair, HelpCircle, Layers, ShieldCheck, Target, Zap } from 'lucide-react';

export function SetupsExplorer() {
  const [selectedSetupId, setSelectedSetupId] = useState<string>('setup-1');
  const activeSetup: TradeSetup = SETUPS_DATA.find((s) => s.id === selectedSetupId) || SETUPS_DATA[0];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Top Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Графічні схеми та алгоритми входу
            </span>
            <span className="text-xs text-slate-400">4 Головні Системні Патерни</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Торгові Сетапи з Повним Регламентом
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Чіткі інструкції входу, захисту позиції та трьохетапного виходу з ринку
          </p>
        </div>

        {/* Setup buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SETUPS_DATA.map((setup, idx) => (
            <button
              key={setup.id}
              onClick={() => setSelectedSetupId(setup.id)}
              className={`px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                selectedSetupId === setup.id
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500 uppercase">Сетап #{idx + 1}</div>
              <div className="text-xs font-bold truncate mt-0.5">{setup.name.split(' (')[0]}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                    setup.direction === 'SHORT'
                      ? 'bg-rose-500/20 text-rose-300'
                      : setup.direction === 'LONG'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {setup.direction}
                </span>
                <span className="text-[10px] text-slate-500">R:R {setup.riskReward.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Setup Content */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Chart Diagram (SVG Schematic) */}
        <div className="lg:col-span-6 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              Схема на графіку (Price Action + Volume Profile)
            </span>
            <span className="font-mono text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Вінрейт: {activeSetup.winRateEstimate}
            </span>
          </div>

          {/* SVG Diagram based on active setup */}
          <div className="my-4 py-2 flex items-center justify-center">
            {activeSetup.id === 'setup-1' && (
              <svg viewBox="0 0 460 260" className="w-full h-auto max-h-[260px] text-slate-300 font-mono text-[10px]">
                {/* Background grid */}
                <line x1="20" y1="50" x2="440" y2="50" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                <line x1="20" y1="120" x2="440" y2="120" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                <line x1="20" y1="200" x2="440" y2="200" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

                {/* Sweep Resistance Line */}
                <line x1="30" y1="75" x2="430" y2="75" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="35" y="70" fill="#f43f5e" fontWeight="bold">Пул ліквідності / High попереднього дня (PDH)</text>

                {/* Candles preceding sweep */}
                {/* Candle 1 (Green) */}
                <line x1="70" y1="110" x2="70" y2="160" stroke="#10b981" strokeWidth="1.5" />
                <rect x="64" y="118" width="12" height="30" fill="#10b981" rx="1" />

                {/* Candle 2 (Green) */}
                <line x1="110" y1="90" x2="110" y2="140" stroke="#10b981" strokeWidth="1.5" />
                <rect x="104" y="98" width="12" height="32" fill="#10b981" rx="1" />

                {/* Sweep Candle (The Hero: Long wick above line, red body below) */}
                <line x1="160" y1="25" x2="160" y2="135" stroke="#f43f5e" strokeWidth="2" />
                <rect x="153" y="85" width="14" height="40" fill="#f43f5e" rx="1" />
                {/* Cluster Bubble at Top Wick */}
                <circle cx="160" cy="40" r="14" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" />
                <text x="180" y="42" fill="#34d399" fontSize="9" fontWeight="bold">Абсорбція на Ask (Trapped)</text>

                {/* Stop Loss Line */}
                <line x1="150" y1="20" x2="250" y2="20" stroke="#ef4444" strokeWidth="1.5" />
                <text x="255" y="24" fill="#ef4444" fontWeight="bold">SL: За пік тіні</text>

                {/* Retest & Entry Candle */}
                <line x1="210" y1="65" x2="210" y2="140" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="204" y="80" width="12" height="50" fill="#f43f5e" rx="1" />
                {/* Entry marker */}
                <polygon points="210,68 205,58 215,58" fill="#38bdf8" />
                <text x="225" y="70" fill="#38bdf8" fontWeight="bold">ВХІД У SHORT (Ретест)</text>

                {/* Impulse Down Candles */}
                <line x1="260" y1="120" x2="260" y2="180" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="254" y="130" width="12" height="40" fill="#f43f5e" rx="1" />

                {/* TP1 Line */}
                <line x1="200" y1="140" x2="430" y2="140" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                <text x="310" y="136" fill="#10b981" fontWeight="bold">TP1 (40%): POC сесії -&gt; Стоп в БЕЗЗБИТОК</text>

                {/* TP2 Line */}
                <line x1="240" y1="190" x2="430" y2="190" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                <text x="310" y="186" fill="#10b981" fontWeight="bold">TP2 (30%): Середина діапазону (50%)</text>

                {/* TP3 Line */}
                <line x1="240" y1="230" x2="430" y2="230" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                <text x="310" y="226" fill="#10b981" fontWeight="bold">TP3 (30%): Протилежні рівні лої (EQL)</text>
              </svg>
            )}

            {activeSetup.id === 'setup-2' && (
              <svg viewBox="0 0 460 260" className="w-full h-auto max-h-[260px] text-slate-300 font-mono text-[10px]">
                {/* Value Area High and Low bands */}
                <rect x="40" y="50" width="380" height="130" fill="#0284c7" fillOpacity="0.08" rx="4" />
                <line x1="40" y1="50" x2="420" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="44" fill="#38bdf8" fontWeight="bold">VAH (Value Area High) — TP2 Фіксація</text>

                <line x1="40" y1="115" x2="420" y2="115" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="45" y="110" fill="#f59e0b" fontWeight="bold">POC (Point of Control) — TP1 (50%)</text>

                <line x1="40" y1="180" x2="420" y2="180" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="45" y="175" fill="#38bdf8" fontWeight="bold">VAL (Value Area Low)</text>

                {/* Deviation Candle falling below VAL */}
                <line x1="120" y1="170" x2="120" y2="230" stroke="#f43f5e" strokeWidth="1.5" />
                <rect x="114" y="175" width="12" height="35" fill="#f43f5e" rx="1" />
                <text x="70" y="240" fill="#f43f5e" fontSize="9">Девіація (Хибний вихід)</text>

                {/* Bullish Absorption Candle returning back inside */}
                <line x1="165" y1="150" x2="165" y2="235" stroke="#10b981" strokeWidth="2" />
                <rect x="158" y="165" width="14" height="40" fill="#10b981" rx="1" />
                <circle cx="165" cy="225" r="10" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
                <text x="180" y="235" fill="#34d399" fontSize="9">Викуп продажів (Trapped Sellers)</text>

                {/* Retest & Entry */}
                <polygon points="215,190 210,202 220,202" fill="#10b981" />
                <text x="225" y="198" fill="#10b981" fontWeight="bold">ВХІД У LONG (Ретест VAL)</text>

                {/* SL Line */}
                <line x1="150" y1="245" x2="240" y2="245" stroke="#ef4444" strokeWidth="1.5" />
                <text x="245" y="248" fill="#ef4444" fontWeight="bold">SL: Під мінімум виходу</text>

                {/* Trajectory Arrow across Value Area */}
                <path d="M 220 185 Q 280 120 370 60" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" />
                <text x="340" y="80" fill="#10b981" fontWeight="bold">Ротація до VAH</text>
              </svg>
            )}

            {activeSetup.id === 'setup-3' && (
              <svg viewBox="0 0 460 260" className="w-full h-auto max-h-[260px] text-slate-300 font-mono text-[10px]">
                {/* CME Gap Box */}
                <rect x="80" y="60" width="320" height="70" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" rx="4" />
                <text x="90" y="80" fill="#f59e0b" fontWeight="bold">CME GAP (Розрив п'ятничного закриття)</text>

                {/* Naked POC line inside Gap */}
                <line x1="80" y1="95" x2="400" y2="95" stroke="#ef4444" strokeWidth="1.5" />
                <text x="90" y="112" fill="#ef4444" fontWeight="bold">Naked POC (Непротестований об'ємний рівень)</text>

                {/* Price Approach */}
                <path d="M 50 200 L 110 160 L 150 180 L 220 100" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="60" y="220" fill="#94a3b8">Рух на перекриття гепу в понеділок</text>

                {/* Touch of nPOC & Reversal */}
                <circle cx="220" cy="95" r="7" fill="#ef4444" />
                <polygon points="220,115 215,125 225,125" fill="#10b981" />
                <text x="235" y="125" fill="#10b981" fontWeight="bold">ВХІД: Тест nPOC + Кластерна реакція</text>

                {/* Reversal Arrow */}
                <path d="M 225 105 Q 280 150 350 210" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <text x="310" y="170" fill="#10b981" fontWeight="bold">Відскок від гепу</text>
              </svg>
            )}

            {activeSetup.id === 'setup-4' && (
              <svg viewBox="0 0 460 260" className="w-full h-auto max-h-[260px] text-slate-300 font-mono text-[10px]">
                {/* Higher High on Price */}
                <path d="M 40 120 L 90 70 L 140 100 L 200 45" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="90" cy="70" r="4" fill="#94a3b8" />
                <circle cx="200" cy="45" r="4" fill="#f43f5e" />
                <text x="180" y="35" fill="#f43f5e" fontWeight="bold">Higher High (Ціна зростає)</text>

                {/* Lower High on CVD indicator below */}
                <line x1="30" y1="180" x2="430" y2="180" stroke="#334155" />
                <text x="35" y="175" fill="#38bdf8">CVD (Кумулятивна дельта)</text>
                <path d="M 40 210 L 90 190 L 140 215 L 200 225" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="90" cy="190" r="4" fill="#38bdf8" />
                <circle cx="200" cy="225" r="4" fill="#f43f5e" />
                <text x="170" y="245" fill="#f43f5e" fontWeight="bold">Lower High (Дельта падає = ДИВЕРГЕНЦІЯ)</text>

                {/* Structural Break Line (CHoCH) */}
                <line x1="140" y1="100" x2="320" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="215" y="95" fill="#f59e0b" fontWeight="bold">CHoCH (Злам Higher Low)</text>

                {/* Break impulse & retest */}
                <path d="M 200 45 L 240 125 L 270 102 L 340 160" fill="none" stroke="#f43f5e" strokeWidth="2" />
                <polygon points="270,95 265,85 275,85" fill="#38bdf8" />
                <text x="280" y="90" fill="#38bdf8" fontWeight="bold">ВХІД на ретесті CHoCH</text>
              </svg>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Співвідношення прибутку: <strong className="text-white">{activeSetup.riskReward}</strong></span>
            <span>Сетап перевірено за методикою: <strong className="text-emerald-400">Dementor CME</strong></span>
          </div>
        </div>

        {/* Right Column: Execution Rules & Criteria Checklist */}
        <div className="lg:col-span-6 space-y-4">
          {/* Card 1: Context & Trigger */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              1. Ринковий Контекст & Тригер Входу
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100">Контекст:</strong> {activeSetup.context}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              <strong className="text-slate-100">Тригер:</strong> {activeSetup.trigger}
            </p>
          </div>

          {/* Card 2: Footprint & Delta Confirmation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              2. Підтвердження на Footprint & Дельті
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-semibold block text-[11px] mb-0.5">Кластери (Footprint):</span>
                {activeSetup.footprintEvidence}
              </div>
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-slate-300">
                <span className="text-blue-400 font-semibold block text-[11px] mb-0.5">Кумулятивна дельта (CVD):</span>
                {activeSetup.deltaCriteria}
              </div>
            </div>
          </div>

          {/* Card 3: Exact Entry, SL & 3-Step Take Profit Schedule */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Target className="w-4 h-4 text-blue-400" />
              3. Точний Вхід, Захисний Стоп та Сітка Фіксації
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase shrink-0">
                  Вхід:
                </span>
                <span className="text-slate-200">{activeSetup.entryRule}</span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase shrink-0">
                  Стоп:
                </span>
                <span className="text-slate-200">{activeSetup.stopLossRule}</span>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1 text-[11px] font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeSetup.tpSchedule.tp1}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeSetup.tpSchedule.tp2}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeSetup.tpSchedule.tp3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
