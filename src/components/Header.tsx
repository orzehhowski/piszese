import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-[#0a0a0a]/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo placeholder — replace with your logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
            <span className="text-sm font-bold text-white dark:text-gray-900">B</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Blog</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
            Home
          </Link>
          <Link href="/tekscik" className="hover:text-gray-900 dark:hover:text-white">
            Articles
          </Link>
        </nav>
      </div>
    </header>
  );
}
