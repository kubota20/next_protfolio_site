import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

// 渡す
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    // create 作成
    const category = await prismadb.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);

    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    //　findMany 複数件取得

    const categories = await prismadb.category.findMany({});

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIED_POST]", error);

    return new NextResponse("Interal error", { status: 500 });
  }
}
