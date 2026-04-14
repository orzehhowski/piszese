import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  subtitle: string;
  headerImage?: string | null;
  isAdmin?: boolean;
  isDraft?: boolean;
}

export default function ArticleCard({ slug, title, subtitle, headerImage, isAdmin = false, isDraft = false }: ArticleCardProps) {
  const href = isAdmin ? `/admin/${slug}` : `/tekscik/${slug}`;
  const displayImage = headerImage || "/images/placeholder.jpg";

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-800"
    >
      {isAdmin && isDraft && (
        <div className="absolute top-2 right-2 z-10 rounded bg-zinc-900/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400 backdrop-blur-sm border border-orange-500/20">
          Szkic
        </div>
      )}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold tracking-tight text-gray-900 group-hover:underline dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </Link>
  );
}
