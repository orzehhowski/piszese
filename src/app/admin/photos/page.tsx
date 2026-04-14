import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PhotoManager from "./PhotoManager";
import { getPhotos } from "./actions";

export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/admin"
          className="mb-4 flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Powrót do panelu
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Galeria zdjęć</h1>
        <p className="mt-2 text-zinc-400">
          Zarządzaj plikami w katalogu publicznym. Możesz tu dodawać nowe zdjęcia i kopiować ich ścieżki do artykułów.
        </p>
      </div>

      <PhotoManager initialPhotos={photos} />
    </div>
  );
}
