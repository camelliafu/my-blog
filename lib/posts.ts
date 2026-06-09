export type Post = {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("获取文章列表失败");
  }

  return res.json();
}

export async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${API_BASE_URL}/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("获取文章详情失败");
  }

  return res.json();
}
