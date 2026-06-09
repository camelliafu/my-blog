import Link from "next/link";
import { getPost } from "../../../lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: 32,
          color: "#2563eb",
          textDecoration: "none",
        }}
      >
        ← 返回文章列表
      </Link>

      <article>
        <h1 style={{ fontSize: 42, marginBottom: 16 }}>{post.title}</h1>

        <p style={{ color: "#666", fontSize: 18, marginBottom: 16 }}>
          {post.description}
        </p>

        <p style={{ color: "#888", marginBottom: 20 }}>
          {new Date(post.date).toISOString().slice(0, 10)}
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                background: "#eef2ff",
                color: "#3730a3",
                fontSize: 13,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.9,
            fontSize: 18,
            color: "#333",
          }}
        >
          {post.content}
        </div>
      </article>
    </main>
  );
}
