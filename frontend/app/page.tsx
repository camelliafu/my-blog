import Link from "next/link";
import { posts } from "@/data/posts";

export default function HomePage() {
  const latestPosts = posts.slice(0, 2);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <p className="mb-3 text-sm font-medium text-blue-600">
          自建博客项目
        </p >

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          记录学习、项目和技术成长
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-gray-600">
          这是一个基于 Next.js、NestJS 和 MySQL 构建的现代化个人博客系统。
          当前项目处于前端基础页面开发阶段。
        </p >

        <div className="mt-8 flex gap-4">
          <Link
            href="/posts"
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            查看文章
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            关于我
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
            <p className="mt-2 text-gray-600">记录最近的项目进展和学习内容。</p >
          </div>

          <Link href="/posts" className="text-sm text-blue-600 hover:underline">
            查看全部
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <article key={post.id} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="mb-2 text-sm text-gray-500">{post.date}</p >

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {post.title}
              </h3>

              <p className="mb-4 text-gray-600">{post.description}</p >

              <Link
                href={`/posts/${post.slug}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                阅读全文
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}