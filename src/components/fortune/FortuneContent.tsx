import React from 'react';
import type { FortuneTexts } from '../../types/fortune';

interface Props {
  texts: FortuneTexts;
}

interface FortuneSection {
  title: string;
  summary: string;
  detail: string;
}

export const FortuneContent: React.FC<Props> = ({ texts }) => {
  // Helper to split text into summary (first sentence) and detail (rest)
  const parseText = (text: string): { summary: string; detail: string } => {
    const parts = text.split(/([。!！?？])/);
    if (parts.length < 2) return { summary: text, detail: '' };
    
    const summary = parts[0] + (parts[1] || '');
    const detail = parts.slice(2).join('');
    return { summary, detail };
  };

  const sections: FortuneSection[] = [
    { title: '🔮 今日指引', ...parseText(texts.overall) },
    { title: '❤️ 爱情运势', ...parseText(texts.love) },
    { title: '💼 事业运势', ...parseText(texts.career) },
    { title: '💰 财富密码', ...parseText(texts.wealth) },
    { title: '✨ 其他运势', ...parseText(texts.others) },
  ];

  return (
    <div className="flex flex-col pb-24">
      {sections.map((section) => (
        <SectionItem key={section.title} section={section} />
      ))}
    </div>
  );
};

const SectionItem = ({ section }: { section: FortuneSection }) => (
  <div className="mb-4">
    <div className="text-pixel-gold text-lg mb-2 font-pixel uppercase tracking-wider">
      {section.title}
    </div>
    <div className="bg-white/5 border-l-2 border-pixel-gold p-3 text-sm leading-relaxed text-slate-300">
      <p className="font-medium text-white mb-1">{section.summary}</p>
      {section.detail && (
        <p className="text-slate-400 text-xs mt-2">{section.detail}</p>
      )}
    </div>
  </div>
);
