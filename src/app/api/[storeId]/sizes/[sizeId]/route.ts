import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sizeId: string }> }
) {
  try {
    const { sizeId } = await params;

    if (!sizeId) {
      return new NextResponse("Size id is required!", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
//
//
//
//
//
//
//
//
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { name, value } = await req.json();
    const { storeId, sizeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required!", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required!", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size id  is required!", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required!", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.update({
      where: {
        id: sizeId,
        storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//
//
//
//
//
//
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, sizeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required!", { status: 400 });
    }
    if (!storeId) {
      return new NextResponse("Store id is required!", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: sizeId,
        storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
