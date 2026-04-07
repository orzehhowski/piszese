'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        img: ({ src, alt }) => (
          <motion.img
            src={src}
            alt={alt}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl cursor-zoom-in shadow-lg"
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ),
      }}
    >
      {content}
      </ReactMarkdown>
    </div>
  );
}