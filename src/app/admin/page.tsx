import ArticleCard from "@/components/ArticleCard";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";

export default function AdminPage() {
  const articles = db.select().from(posts).all();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Siema mistrzuniu</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle || ""}
            imageUrl="/images/placeholder.jpg"
            isAdmin={true}
          />
        ))}
      </div>
    </div>
  );
}
