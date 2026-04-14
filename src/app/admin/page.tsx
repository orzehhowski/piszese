import ArticleCard from "@/components/ArticleCard";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import Link from "next/link";

export default function AdminPage() {
  const articles = db.select().from(posts).all();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Siema mistrzuniu</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/photos"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Zarządzaj zdjęciami
          </Link>
          <Link
            href="/admin/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Dodaj nowy artykuł
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle || ""}
            headerImage={article.headerImage}
            isAdmin={true}
            isDraft={article.isDraft}
          />
        ))}
      </div>
    </div>
  );
}
