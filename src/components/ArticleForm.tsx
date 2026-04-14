"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

interface ArticleFormProps {
  initialData?: Post;
  isEditing?: boolean;
}

export default function ArticleForm({ initialData, isEditing = false }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    subtitle: initialData?.subtitle || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    headerImage: initialData?.headerImage || "",
    isDraft: initialData?.isDraft ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // API endpoints work with ID for PATCH/DELETE
    const url = isEditing ? `/api/articles/${initialData?.id}` : "/api/articles";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Coś poszło nie tak");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Tytuł</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Slug (URL)</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Podtytuł</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">URL zdjęcia nagłówkowego</label>
        <input
          type="text"
          placeholder="/fotka/grubodziob.jpg"
          value={formData.headerImage}
          onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Krótki opis (Excerpt)</label>
        <textarea
          rows={3}
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Treść (Markdown)</label>
        <textarea
          required
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-white font-mono focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isDraft"
          checked={formData.isDraft}
          onChange={(e) => setFormData({ ...formData, isDraft: e.target.checked })}
          className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isDraft" className="text-sm font-medium text-gray-300">
          Zapisz jako szkic
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium disabled:opacity-50 transition-colors"
        >
          {loading ? "Zapisywanie..." : isEditing ? "Zaktualizuj wpis" : "Opublikuj wpis"}
        </button>
      </div>
    </form>
  );
}
