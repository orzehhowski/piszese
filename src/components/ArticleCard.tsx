import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  isAdmin?: boolean;
}

export default function ArticleCard({ slug, title, subtitle, imageUrl, isAdmin = false }: ArticleCardProps) {
  const href = isAdmin ? `/admin/${slug}` : `/tekscik/${slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-800"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={imageUrl}
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
