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
      className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-md ${
        isDraft 
          ? "border-orange-500/20 bg-orange-500/5 dark:border-orange-500/10 dark:bg-orange-950/10" 
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      {isDraft && (
        <div className="absolute top-2 right-2 z-10 rounded-md bg-orange-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          Szkic
        </div>
      )}
      <div className={`relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900 ${isDraft ? "opacity-60 grayscale-[0.5]" : ""}`}>
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className={`font-semibold tracking-tight group-hover:underline ${isDraft ? "text-orange-200/80" : "text-gray-900 dark:text-white"}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </Link>
  );
}
