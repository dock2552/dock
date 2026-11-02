import { useState, useEffect } from 'react';
import { generateWordDocument } from '../utils/docxGenerator';
import { Download, FileText, Copy, Check, FileDown, BookOpen, Sparkles, Loader2 } from 'lucide-react';

export function DocumentViewer() {
  const [fileText, setFileText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState<boolean>(false);

  useEffect(() => {
    fetch('/логіка торгівлі.txt')
      .then((res) => res.text())
      .then((text) => setFileText(text))
      .catch(() => {
        // Fallback if fetch fails
        setFileText('Помилка завантаження файлу. Використовуйте кнопки завантаження вище.');
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'логіка торгівлі.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocx = async () => {
    try {
      setIsGeneratingDocx(true);
      const blob = await generateWordDocument();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Dementor_CME_Логіка_Торгівлі.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating docx:', err);
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      {/* Top Banner with Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Офіційний Документ Системи
            </span>
            <span className="text-xs text-slate-400 font-mono">логіка торгівлі.txt & .docx</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Текстовий Регламент & Експорт у Word
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Повний документ з усіма дрібницями, формулами, налаштуваннями та чек-листом
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Download Word Docx */}
          <button
            onClick={handleDownloadDocx}
            disabled={isGeneratingDocx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGeneratingDocx ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            Завантажити Word (.docx)
          </button>

          {/* Download TXT */}
          <button
            onClick={handleDownloadTxt}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Завантажити «логіка торгівлі.txt»
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Скопійовано!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Копіювати текст</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Callout */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>
            Файл збережено в корені проекту як <strong className="text-slate-200 font-mono">/логіка торгівлі.txt</strong> та в <strong className="text-slate-200 font-mono">/public/логіка торгівлі.txt</strong>.
          </span>
        </div>
        <span className="font-mono text-slate-500 hidden sm:inline">
          {fileText.split('\n').length} рядків | {(fileText.length / 1024).toFixed(1)} КБ
        </span>
      </div>

      {/* Code / Text Preview Terminal Box */}
      <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-slate-300">логіка торгівлі.txt</span>
          </div>
          <span>UTF-8 • Plain Text / Markdown</span>
        </div>

        <div className="p-4 max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-1 select-text">
          <pre className="whitespace-pre-wrap font-mono">{fileText}</pre>
        </div>
      </div>
    </div>
  );
}
