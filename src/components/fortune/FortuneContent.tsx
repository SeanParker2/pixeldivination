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
    { title: '今日运势', ...parseText(texts.overall) },
    { title: '爱情运势', ...parseText(texts.love) },
    { title: '事业运势', ...parseText(texts.career) },
    { title: '财运指数', ...parseText(texts.wealth) },
    { title: '其他运势', ...parseText(texts.others) },
  ];

  return (
    <div className="flex flex-col gap-3 pb-24">
      {sections.map((section) => (
        <SectionCard key={section.title} section={section} />
      ))}
    </div>
  );
};

const SectionCard = ({ section }: { section: FortuneSection }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
    <h3 className="text-pixel-gold text-sm font-bold mb-2 font-pixel">{section.title}</h3>
    <p className="text-white text-sm mb-3 leading-relaxed font-medium">
      {section.summary}
    </p>
    
    {section.detail && (
      <>
        <div className="border-t border-dashed border-white/10 my-3" />
        <p className="text-gray-400 text-xs leading-relaxed">
          {section.detail}
        </p>
      </>
    )}
  </div>
);
