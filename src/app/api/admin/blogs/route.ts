import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

// 渡す
export async function POST(req: Request) {
  try {
    const { title, discription, link, categoryId, imageUrl, release } =
      await req.json();

    if (!title) {
      return new NextResponse("title is required", { status: 400 });
    }

    if (!discription) {
      return new NextResponse("discription is required", { status: 400 });
    }

    if (!link) {
      return new NextResponse("link is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    // create 作成
    const blog = await prismadb.blog.create({
      data: {
        title,
        discription,
        link,
        categoryId,
        imageUrl,
        release,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log("[BLOG_POST]", error);

    return new NextResponse("Interal error", { status: 500 });
  }
}

// ゲット
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // http://localhost:3000/about/categories/[categoryId] の[categoryId]を貰います
    const categoryId = searchParams.get("categoryId") || undefined;

    //　findMany 複数件取得
    const blogs = await prismadb.blog.findMany({
      where: {
        categoryId,
        release: true,
      },
      include: {
        // category を取り出す
        category: true,
      },
      orderBy: {
        // 順番
        createdAt: "desc",
      },
    });

    return NextResponse.json({ blogs }, { status: 201 });
  } catch (error) {
    console.log("[BLOGS_POST]", error);

    return new NextResponse("Interal error", { status: 500 });
  }
}
