import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <section style={{ marginBottom: 40 }}>
        <p style={{ color: "#2563eb", fontWeight: 600 }}>My Blog</p>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>我的技术博客</h1>
        <p style={{ fontSize: 18, color: "#666" }}>
          前端页面已经成功从后端接口读取文章数据。
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>文章列表</h2>

        <div style={{ display: "grid", gap: 20 }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  padding: 24,
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  background: "#fff",
                }}
              >
                <h3 style={{ fontSize: 24, marginBottom: 8 }}>{post.title}</h3>

                <p style={{ color: "#666", marginBottom: 12 }}>
                  {post.description}
                </p>

                <p style={{ fontSize: 14, color: "#888", marginBottom: 12 }}>
                  {post.date}
                </p>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
