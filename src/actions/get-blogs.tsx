import { Blog } from "@/types/types";

const URL = `${process.env.NEXTAUTH_URL}/api/admin/blogs`;

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(URL, {
    // SSR
    cache: "no-store",
  });
  try {
    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();

    return data.blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};
