import Link from "next/link";
import { posts } from "@/data/posts";

export default function PostsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">文章列表</h1>
        <p className="mt-3 text-gray-600">
          这里会展示所有博客文章，后续会接入数据库和后台管理。
        </p >
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm text-gray-500">{post.date}</p >

            <h2 className="text-2xl font-semibold text-gray-900">
              {post.title}
            </h2>

            <p className="mt-3 text-gray-600">{post.description}</p >

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/posts/${post.slug}`}
              className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              阅读全文
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}