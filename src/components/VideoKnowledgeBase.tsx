import { useState } from 'react';
import { VIDEOS_DATA, VideoResource } from '../data/tradingData';
import { PlayCircle, ExternalLink, Search, Filter, BookOpen, CheckCircle } from 'lucide-react';

export function VideoKnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredVideos = VIDEOS_DATA.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.keyRule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || video.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = [
    { key: 'ALL', label: 'Всі 17 відео' },
    { key: 'Execution', label: 'Алгоритм & Сетапи' },
    { key: 'Order Flow', label: 'Footprint & Дельта' },
    { key: 'Volume & Profile', label: 'Профіль & CME' },
    { key: 'Psychology', label: 'Психологія & FOMO' },
    { key: 'Foundation', label: 'База & Структура' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Повний Відео-Силабус
            </span>
            <span className="text-xs text-slate-400 font-mono">17 Уроків Dementor</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Аналіз та Розбір Усіх 17 Відео
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Кожне надане відео переглянуто, структуровано та зведено в практичний регламент
          </p>
        </div>

        {/* Search bar */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Пошук теми, правила або індикатора..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video, idx) => (
          <div
            key={video.id}
            className="bg-slate-950 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badge + Video Number */}
              <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                <span className="text-rose-400 font-bold">Урок #{video.id}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] border border-slate-800">
                  {video.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-2">
                {video.title}
              </h3>

              {/* Topic */}
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {video.topic}
              </p>

              {/* Key Takeaway Rule Box */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs">
                <span className="text-amber-400 font-bold text-[10px] uppercase block mb-1">
                  Ключове правило:
                </span>
                <p className="text-slate-300 italic text-[11px]">
                  «{video.keyRule}»
                </p>
              </div>

              {/* Points */}
              <div className="mt-3 space-y-1">
                {video.notes.map((note, nIdx) => (
                  <div key={nIdx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle className="w-3 h-3 text-emerald-500/70 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link to YouTube */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                ID: {video.youtubeId}
              </span>
              <a
                href={`https://www.youtube.com/watch?v=dA7CHuUSjRc`.replace('dA7CHuUSjRc', video.youtubeId)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Дивитися на YouTube
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
