import ArticleCard from "@/components/ArticleCard";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq, desc, and } from "drizzle-orm";

export default async function Home() {
  const articles = await db.select().from(posts).where(eq(posts.isDraft, false)).orderBy(desc(posts.createdAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-white">Artykuły</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle || ""}
            headerImage={article.headerImage}
          />
        ))}
      </div>
    </div>
  );
}
