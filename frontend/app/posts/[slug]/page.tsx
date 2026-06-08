import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../data/posts";

type PostDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params;

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="rounded-2xl bg-white p-8 shadow-sm">
      <Link href="/posts" className="text-sm text-blue-600 hover:underline">
        ← 返回文章列表
      </Link>

      <div className="mt-6">
        <p className="mb-3 text-sm text-gray-500">{post.date}</p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600">{post.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 whitespace-pre-line leading-8 text-gray-700">
        {post.content}
      </div>
    </article>
  );
}
