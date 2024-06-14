import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

// 取得
export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    // blogIdに問題がある場合
    if (!params.blogId) {
      return new NextResponse("blog id is required", { status: 400 });
    }
    // findUnique 取得 一意の識別子またはIDを指定する必要がある
    const blog = await prismadb.blog.findUnique({
      where: {
        id: params.blogId,
      },
      include: {
        // category取り出し
        category: true,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log("[BLOG_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 変更
export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { title, discription, link, categoryId, imageUrl, release } =
      await req.json();

    // blogIdに問題がある場合
    if (!params.blogId) {
      return new NextResponse("blog id is required", { status: 400 });
    }

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

    const blog = await prismadb.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title,
        discription,
        link,
        imageUrl,
        categoryId,
        release,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log("[BLOG_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 削除
export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    // blogIdに問題がある場合
    if (!params.blogId) {
      return new NextResponse("blog id is required", { status: 400 });
    }

    // deleteMany 複数件削除 条件に一致する全てのレコードを削除する
    const blog = await prismadb.blog.deleteMany({
      where: {
        // idだけ消せば全部消える
        id: params.blogId,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log("[BLOG_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
