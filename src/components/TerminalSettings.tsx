import { useState } from 'react';
import { TERMINAL_CONFIGS } from '../data/tradingData';
import { Monitor, Sliders, CheckSquare, Copy, Check } from 'lucide-react';

export function TerminalSettings() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activeConfig = TERMINAL_CONFIGS[activeTab];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Софт та Індикатори
            </span>
            <span className="text-xs text-slate-400">Order Flow & Market Profile</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Налаштування Робочого Простору
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Точні параметри кластерів, дельти та профілів об'єму в ATAS, TradingView та ExoCharts
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2">
          {TERMINAL_CONFIGS.map((conf, idx) => (
            <button
              key={conf.terminal}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 scale-[1.02]'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {conf.terminal.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-400" />
              {activeConfig.terminal}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeConfig.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeConfig.steps.map((step, idx) => (
            <div
              key={step.name}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-purple-400" />
                    {step.name}
                  </span>
                  <button
                    onClick={() => handleCopy(`${step.name}: ${step.setting}`, idx)}
                    className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
                    title="Копіювати налаштування"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800/80">
                  {step.setting}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
