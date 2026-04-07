'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-out my-4"
          />
        ),
      }}
    >
      {content}
      </ReactMarkdown>
    </div>
  );
}