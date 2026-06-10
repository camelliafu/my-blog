"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("账号或密码错误");
      }

      const data = await res.json();

      document.cookie = `admin_token=${data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;

      router.push("/admin/posts");
    } catch {
      setError("账号或密码错误");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>后台登录</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>账号</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 8,
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 8,
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          />
        </div>

        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
    </main>
  );
}
