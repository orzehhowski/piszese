import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import Markdown from '@/components/Markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = db.select().from(posts).where(
    and(
      eq(posts.slug, slug),
      eq(posts.isDraft, false)
    )
  ).get();
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = db.select().from(posts).where(
    and(
      eq(posts.slug, slug),
      eq(posts.isDraft, false)
    )
  ).get();

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      {post.headerImage && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <Image
            src={post.headerImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">{post.title}</h1>
        <p className="text-gray-400 mt-2">{post.createdAt.toLocaleDateString('pl-PL')}</p>
      </header>
      <Markdown content={post.content} />
    </article>
  );
}
