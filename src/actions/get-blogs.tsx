import { Blog } from "@/types/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/blogs`;

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await fetch(URL, {
      // SSR
      cache: "no-store",
    });

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
