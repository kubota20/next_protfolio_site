import { Category } from "@/types/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`;

export const getCategories = async () => {
  try {
    const res = await fetch(URL, {
      // SSR
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};
