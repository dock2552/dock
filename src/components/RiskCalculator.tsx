import { useState } from 'react';
import { Calculator, DollarSign, Percent, Shield, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export function RiskCalculator() {
  const [deposit, setDeposit] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [asset, setAsset] = useState<string>('BTC');
  const [entryPrice, setEntryPrice] = useState<number>(68000);
  const [stopLossPrice, setStopLossPrice] = useState<number>(68550); // Short example by default
  const [tpTargetPrice, setTpTargetPrice] = useState<number>(66350);
  const [selectedLeverage, setSelectedLeverage] = useState<number>(10);

  // Determine trade direction
  const isShort = stopLossPrice > entryPrice;
  const isLong = stopLossPrice < entryPrice;

  // Stop loss distance in points & percentage
  const stopPoints = Math.abs(entryPrice - stopLossPrice);
  const stopPercent = entryPrice > 0 ? (stopPoints / entryPrice) * 100 : 0;

  // Target profit distance in points & percentage
  const tpPoints = isShort ? entryPrice - tpTargetPrice : tpTargetPrice - entryPrice;
  const tpPercent = entryPrice > 0 ? (tpPoints / entryPrice) * 100 : 0;

  // Dollars at risk
  const riskAmount = (deposit * riskPercent) / 100;

  // Position Size in Dollars ($) = Risk ($) / (Stop % / 100)
  const positionSizeUsd = stopPercent > 0 ? riskAmount / (stopPercent / 100) : 0;
  const positionSizeCoins = entryPrice > 0 ? positionSizeUsd / entryPrice : 0;

  // Margin required for this position at chosen leverage
  const marginRequired = selectedLeverage > 0 ? positionSizeUsd / selectedLeverage : 0;

  // Effective portfolio leverage
  const effectivePortfolioLeverage = deposit > 0 ? positionSizeUsd / deposit : 0;

  // Risk to Reward ratio
  const rrRatio = stopPoints > 0 ? tpPoints / stopPoints : 0;

  // Profits for partial TP schedule
  const totalPotentialProfit = positionSizeCoins * tpPoints;
  const tp1Profit = totalPotentialProfit * 0.4;
  const tp2Profit = totalPotentialProfit * 0.3;
  const tp3Profit = totalPotentialProfit * 0.3;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Математика без ліквідацій
            </span>
            <span className="text-xs text-slate-400 font-mono">Правило 1% Депозиту</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Калькулятор Ризику, Маржі та Плеча Dementor
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Точний розрахунок лоту за формулою автора: плече регулює маржу, а не збільшує збиток
          </p>
        </div>

        {/* Direction tag */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Напрямок угоди:</span>
          <span
            className={`px-3 py-1 rounded-lg font-bold ${
              isShort
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isShort ? 'SHORT 📉 (Продаж)' : 'LONG 📈 (Купівля)'}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Column */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Вхідні Дані Угоди
          </h3>

          {/* Deposit & Risk % */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 font-medium block mb-1">
                Баланс депозиту ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Math.max(10, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <DollarSign className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 font-medium block mb-1">
                Ризик на 1 угоду (%)
              </label>
              <div className="flex gap-1.5">
                {[0.5, 1.0, 2.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRiskPercent(r)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      riskPercent === r
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Asset Picker */}
          <div>
            <label className="text-[11px] text-slate-400 font-medium block mb-1">
              Торговий актив
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'BTC', price: 68000, sl: 68550, tp: 66350 },
                { name: 'ETH', price: 3500, sl: 3540, tp: 3380 },
                { name: 'XAU (Gold)', price: 2750, sl: 2765, tp: 2705 },
                { name: 'SOL', price: 185, sl: 189, tp: 173 },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setAsset(item.name);
                    setEntryPrice(item.price);
                    setStopLossPrice(item.sl);
                    setTpTargetPrice(item.tp);
                  }}
                  className={`py-1.5 px-2 text-xs font-mono rounded-lg border text-center transition-all ${
                    asset === item.name
                      ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Entry, Stop Loss, Take Profit */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 font-medium block mb-1">
                Ціна входу (Entry Price $)
              </label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-rose-400 font-medium block mb-1">
                  Ціна Стоп-лосу (SL $)
                </label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-rose-500/40 rounded-lg px-3 py-2 text-sm text-rose-300 font-mono focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-emerald-400 font-medium block mb-1">
                  Ціна Тейк-профіту (TP $)
                </label>
                <input
                  type="number"
                  value={tpTargetPrice}
                  onChange={(e) => setTpTargetPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-emerald-500/40 rounded-lg px-3 py-2 text-sm text-emerald-300 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Leverage Selector */}
          <div>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400">Плече в терміналі біржі:</span>
              <span className="text-emerald-400 font-mono font-bold">{selectedLeverage}x (Ізольоване)</span>
            </div>
            <div className="flex gap-2">
              {[2, 5, 10, 20, 50].map((lev) => (
                <button
                  key={lev}
                  onClick={() => setSelectedLeverage(lev)}
                  className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    selectedLeverage === lev
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Ризик у доларах</span>
              <span className="text-xl font-bold text-rose-400 mt-1 block">
                -${riskAmount.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400">{riskPercent}% від капіталу</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Відстань до стопу</span>
              <span className="text-xl font-bold text-white mt-1 block">
                {stopPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-400">{stopPoints.toFixed(1)} пунктів</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Співвідношення R:R</span>
              <span
                className={`text-xl font-bold mt-1 block ${
                  rrRatio >= 2.5 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                1 : {rrRatio.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400">
                {rrRatio >= 2.5 ? '✓ Дозволено вхід' : '⚠ R:R нижче 1:2.5'}
              </span>
            </div>
          </div>

          {/* Position & Margin Calculation Result */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Shield className="w-4 h-4 text-blue-400" />
              Точні Параметри Позиції для Введення на Біржі:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">РОЗМІР ПОЗИЦІЇ В ДОЛАРАХ</span>
                <span className="text-lg font-bold text-emerald-300">
                  ${positionSizeUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  = {positionSizeCoins.toFixed(4)} {asset}
                </span>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">НЕОБХІДНА МАРЖА (ЗАСТАВА)</span>
                <span className="text-lg font-bold text-amber-300">
                  ${marginRequired.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  за плеча {selectedLeverage}x (Ізольована)
                </span>
              </div>
            </div>

            {/* Dementor's Partial TP Schedule */}
            <div className="mt-3 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-bold block mb-2">
                Схема фіксації прибутку (Сходинка Dementor):
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                  <span className="text-emerald-400 font-bold block">TP1 (40%)</span>
                  <span className="text-white">+${tp1Profit.toFixed(1)}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Стоп в Безубиток</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                  <span className="text-emerald-400 font-bold block">TP2 (30%)</span>
                  <span className="text-white">+${tp2Profit.toFixed(1)}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Daily POC</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                  <span className="text-emerald-400 font-bold block">TP3 (30%)</span>
                  <span className="text-white">+${tp3Profit.toFixed(1)}</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Ранер до цілі</span>
                </div>
              </div>
              <div className="mt-2 text-right text-emerald-400 font-bold text-xs">
                Загальний очікуваний профіт: +${totalPotentialProfit.toFixed(2)} (+{(totalPotentialProfit / deposit * 100).toFixed(1)}% до депозиту)
              </div>
            </div>
          </div>

          {/* Dementor Wisdom Callout Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5 font-semibold">
                Залізний закон Dementor про плече:
              </strong>
              «Якщо ви ризикуєте 1% від балансу ($100), вам абсолютно все одно, стоїть у терміналі 5x плече чи 20x плече.
              При спрацюванні стопу ви втратите рівно $100. Плече лише змінює суму маржі, яку біржа блокує на час угоди.
              Ніколи не торгуйте без стопу і ніколи не доливайтеся в збиток!»
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
