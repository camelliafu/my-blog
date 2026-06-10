"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    date: "",
    tags: "",
    content: "",
  });

  useEffect(() => {
    let ignore = false;

    async function fetchPosts() {
      try {
        const res = await fetch(`${API_BASE_URL}/posts`);

        if (!res.ok) {
          throw new Error(`获取文章失败：${res.status}`);
        }

        const data = await res.json();

        if (!ignore) {
          setPosts(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "获取文章失败");
        }
      }
    }

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, []);

  async function loadPosts() {
    const res = await fetch(`${API_BASE_URL}/posts`);

    if (!res.ok) {
      throw new Error(`获取文章失败：${res.status}`);
    }

    const data = await res.json();
    setPosts(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      date: form.date,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: form.content,
    };

    if (editingId) {
      await fetch(`${API_BASE_URL}/posts/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    setEditingId(null);

    setForm({
      slug: "",
      title: "",
      description: "",
      date: "",
      tags: "",
      content: "",
    });

    await loadPosts();
  }

  function handleEdit(post: Post) {
    setEditingId(post.id);

    setForm({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: new Date(post.date).toISOString().slice(0, 10),
      tags: post.tags.join(","),
      content: post.content,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm("确定要删除这篇文章吗？");

    if (!confirmed) {
      return;
    }

    await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });

    await loadPosts();
  }

  function handleCancelEdit() {
    setEditingId(null);

    setForm({
      slug: "",
      title: "",
      description: "",
      date: "",
      tags: "",
      content: "",
    });
  }

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>后台文章管理</h1>

      {error && <p style={{ color: "#dc2626", marginBottom: 20 }}>{error}</p>}

      <section
        style={{
          padding: 24,
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>
          {editingId ? "编辑文章" : "新增文章"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <input
            placeholder="slug，例如 my-first-post"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="标题"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="描述"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={inputStyle}
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            style={inputStyle}
          />

          <input
            placeholder="标签，用英文逗号分隔，例如 Next.js,NestJS,Prisma"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            style={inputStyle}
          />

          <textarea
            placeholder="正文内容"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={8}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              padding: "12px 16px",
              border: 0,
              borderRadius: 10,
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {editingId ? "保存修改" : "新增文章"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                padding: "12px 16px",
                border: 0,
                borderRadius: 10,
                background: "#6b7280",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              取消编辑
            </button>
          )}
        </form>
      </section>

      <section>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>文章列表</h2>

        <div style={{ display: "grid", gap: 16 }}>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                padding: 20,
                border: "1px solid #e5e7eb",
                borderRadius: 14,
              }}
            >
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>{post.title}</h3>

              <p style={{ color: "#666", marginBottom: 8 }}>
                {post.description}
              </p>

              <p style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>
                {new Date(post.date).toISOString().slice(0, 10)}
              </p>

              <button
                onClick={() => handleEdit(post)}
                style={{
                  padding: "8px 12px",
                  border: 0,
                  borderRadius: 8,
                  background: "#2563eb",
                  color: "#fff",
                  cursor: "pointer",
                  marginRight: 8,
                }}
              >
                编辑
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                style={{
                  padding: "8px 12px",
                  border: 0,
                  borderRadius: 8,
                  background: "#dc2626",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                删除
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: 10,
  fontSize: 16,
};
