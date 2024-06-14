import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

// 取得
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // categoryIdに問題がある場合
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // findUnique 取得 一意の識別子またはIDを指定する必要がある
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    // id 問題がある場合
    if (!category) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 変更
export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { name } = await req.json();

    // categoryIdに問題がある場合
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // update 更新 条件に一致するレコードを更新,一意の識別子またはIDを指定する必要がある
    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// 消す
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // categoryIdに問題がある場合
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // deleteMany 複数件削除 条件に一致する全てのレコードを削除する
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
