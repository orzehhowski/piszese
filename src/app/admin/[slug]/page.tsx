import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ArticleForm from "@/components/ArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const article = db.select().from(posts).where(eq(posts.slug, slug)).get();

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Edytuj artykuł</h1>
        <p className="text-gray-400 mt-2">Dostosuj treść i ustawienia swojego wpisu.</p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <ArticleForm initialData={article} isEditing={true} />
      </div>
    </div>
  );
}
