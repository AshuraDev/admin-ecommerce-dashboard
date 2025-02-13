import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    const { billboardId } = await params;

    if (!billboardId) {
      return new NextResponse("Billboard id is required!", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
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
  { params }: { params: Promise<{ storeId: string; billboardId: string }> }
) {
  try {
    const { userId } = await auth();
    const { label, imgUrl } = await req.json();
    const { storeId, billboardId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required!", { status: 400 });
    }
    if (!imgUrl) {
      return new NextResponse("Image URL is required!", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard id  is required!", { status: 400 });
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

    const billboard = await prismadb.billboard.update({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imgUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
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
  { params }: { params: Promise<{ storeId: string; billboardId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, billboardId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard id is required!", { status: 400 });
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

    const billboard = await prismadb.billboard.delete({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
