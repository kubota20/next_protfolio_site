import { Blog } from "@/types/types";
import { getAbsoluteUrl } from "./get-absolute-url";
import { IncomingMessage } from "http";

export const getBlogs = async (req: IncomingMessage): Promise<Blog[]> => {
  const URL = `${getAbsoluteUrl(req)}/api/admin/blogs`;

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
