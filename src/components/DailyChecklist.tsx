import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckSquare, Square, RotateCcw, Award, Clock, Flame, ShieldAlert } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'PRE_MARKET' | 'SESSION' | 'EXECUTION' | 'REVIEW';
  label: string;
  detail: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // 1. Pre-market
  {
    id: 'chk-1',
    category: 'PRE_MARKET',
    label: 'Перевірка ф\'ючерсів CME (BTC1!) на наявність відкритих гепів',
    detail: 'Позначте межі п\'ятничного закриття 23:00 GMT та недільного відкриття.'
  },
  {
    id: 'chk-2',
    category: 'PRE_MARKET',
    label: 'Аналіз індексу долара DXY та макроекономічного календаря',
    detail: 'Перевірте час виходу новин CPI, NFP або рішень FOMC (заборонено торгувати за 15 хв).'
  },
  {
    id: 'chk-3',
    category: 'PRE_MARKET',
    label: 'Нанесення ключових HTF рівнів: Previous Day High/Low, Daily Open, nPOC',
    detail: 'Виділіть зони ліквідності попереднього дня та незакриті Naked POC.'
  },
  {
    id: 'chk-4',
    category: 'PRE_MARKET',
    label: 'Побудова меж Азійської сесії (Asia High / Asia Low: 00:00 - 06:00 UTC)',
    detail: 'Азійський діапазон є головною ціллю для маніпуляцій на відкритті Лондона.'
  },

  // 2. Session Monitoring
  {
    id: 'chk-5',
    category: 'SESSION',
    label: 'Очікування зняття ліквідності (Sweep) одного з ключових екстремумів',
    detail: 'НЕ відкривати угоди доки не відбудеться виніс стопів ритейлу (манипуляція).'
  },
  {
    id: 'chk-6',
    category: 'SESSION',
    label: 'Перевірка Footprint: наявність кластерної абсорбції (поглинання) або стеку',
    detail: 'Шукайте сплеск об\'єму на кінчику тіні свічки або 3+ рівня дисбалансу >300%.'
  },
  {
    id: 'chk-7',
    category: 'SESSION',
    label: 'Перевірка дивергенції на Кумулятивній Дельті (CVD)',
    detail: 'Ціна оновила хай/лой, а дельта показує явний розсинхрон (виснаження).'
  },

  // 3. Execution
  {
    id: 'chk-8',
    category: 'EXECUTION',
    label: 'Розрахунок розміру позиції строго під 1% ризику від депозиту',
    detail: 'Використовуйте формулу: Ризик $ / (Стоп % / 100). Ніяких "входів на всю котлету".'
  },
  {
    id: 'chk-9',
    category: 'EXECUTION',
    label: 'Виставлення Стоп-лосу ОДНОЧАСНО з ордером входу в ринок',
    detail: 'Заборонено входити без залізного стопу в системі.'
  },
  {
    id: 'chk-10',
    category: 'EXECUTION',
    label: 'Розстановка лімітних ордерів фіксації (TP1: 40%, TP2: 30%, TP3: 30%)',
    detail: 'TP1 на сесійному POC. Після взяття TP1 стоп-лос ПЕРЕВЕСТИ В БЕЗЗБИТОК.'
  },

  // 4. Review
  {
    id: 'chk-11',
    category: 'REVIEW',
    label: 'Збереження скріншоту Footprint та графіка в щоденник трейдера',
    detail: 'Зафіксуйте кластери в момент входу та результат після виходу.'
  },
  {
    id: 'chk-12',
    category: 'REVIEW',
    label: 'Психологічний чек-ап: відсутність FOMO та тильту',
    detail: 'Чи не було бажання відігратися? Чи не порушено дисципліну?'
  }
];

export function DailyChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dementor_checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dementor_checklist', JSON.stringify(checkedIds));
    } catch {}
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      const newChecked = [...checkedIds, id];
      setCheckedIds(newChecked);
      if (newChecked.length === CHECKLIST_ITEMS.length) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const resetAll = () => {
    setCheckedIds([]);
  };

  const progress = Math.round((checkedIds.length / CHECKLIST_ITEMS.length) * 100);

  const categories = [
    { key: 'PRE_MARKET', name: '1. Ранковий Пре-маркет (08:00 UTC)', color: 'text-blue-400' },
    { key: 'SESSION', name: '2. Сесійний Моніторинг (Лондон / Нью-Йорк)', color: 'text-amber-400' },
    { key: 'EXECUTION', name: '3. Виконання Ордерів & Ризик-менеджмент', color: 'text-emerald-400' },
    { key: 'REVIEW', name: '4. Журнал Угод & Психологія', color: 'text-purple-400' }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Щоденна Дисципліна Dementor
            </span>
            <span className="text-xs text-slate-400">12 Кроків до Системної Угоди</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Торговий Чек-лист Трейдера
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Не натискайте кнопку входу в біржі, доки кожен обов'язковий пункт не перевірено
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Скинути чек-лист
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            Готовність до торгівлі: {checkedIds.length} із {CHECKLIST_ITEMS.length}
          </span>
          <span className={`font-mono text-sm ${progress === 100 ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
            {progress}% {progress === 100 ? '✓ ГОТОВИЙ' : ''}
          </span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              progress === 100 ? 'bg-emerald-500 shadow-md shadow-emerald-500/50' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="mt-6 space-y-6">
        {categories.map((cat) => {
          const items = CHECKLIST_ITEMS.filter((i) => i.category === cat.key);
          return (
            <div key={cat.key} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${cat.color}`}>
                {cat.name}
              </h3>
              <div className="space-y-2.5">
                {items.map((item) => {
                  const isChecked = checkedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                          : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-slate-400 hover:text-white">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                      <div className="flex-1">
                        <span className={`text-xs font-medium block ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
