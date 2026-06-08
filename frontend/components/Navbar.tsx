import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          My Blog
        </Link>

        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            首页
          </Link>
          <Link href="/posts" className="hover:text-gray-900">
            文章
          </Link>
          <Link href="/about" className="hover:text-gray-900">
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}