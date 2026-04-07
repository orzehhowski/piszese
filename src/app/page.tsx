import ArticleCard from "@/components/ArticleCard";

const articles = [
  {
    slug: "moj-pierwszy-wpis",
    title: "Mój pierwszy wpis",
    subtitle: "Witaj na moim blogu! To jest przykładowy artykuł na start.",
    imageUrl: "/images/placeholder.jpg",
  },
  {
    slug: "dlaczego-napisalem-bloga",
    title: "Dlaczego napisałem bloga",
    subtitle: "O mojej drodze do tworzenia i dlaczego postanowiłem to udokumentować.",
    imageUrl: "/images/placeholder.jpg",
  },
  {
    slug: "nowe-technologie",
    title: "Nowe technologie w 2026",
    subtitle: "Krótki przegląd narzędzi i frameworków, których obecnie używam.",
    imageUrl: "/images/placeholder.jpg",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">"Artykuły"</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle}
            imageUrl={article.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
