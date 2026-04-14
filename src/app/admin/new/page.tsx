import ArticleForm from "@/components/ArticleForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Powrót do panelu
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dodaj nowy artykuł</h1>
        <p className="text-gray-400 mt-2">Podziel się nową historią ze swoimi czytelnikami.</p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        <ArticleForm isEditing={false} />
      </div>
    </div>
  );
}
