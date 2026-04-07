import { db, posts } from '@/lib/db';
import { eq } from 'drizzle-orm';
import Markdown from '@/components/Markdown';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = db.select().from(posts).where(eq(posts.slug, slug)).get();
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = db.select().from(posts).where(eq(posts.slug, slug)).get();

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">{post.title}</h1>
        <p className="text-gray-400 mt-2">{post.createdAt.toLocaleDateString()}</p>
      </header>
      <Markdown content={post.content} />
    </article>
  );
}
