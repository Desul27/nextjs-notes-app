import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const userId = searchParams.get("userId");
const notes = await prisma.note.findMany({
  where: {
    userId: userId || "",
  },
  orderBy: { id: "desc" },
});
  return Response.json(notes);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const note = await prisma.note.create({
      data: {
        title: body.title,
        userId: body.userId,
      },
    });

    return Response.json(note);
  } catch (error) {
    return Response.json(
      { error: "Gagal menambah note" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id, userId } = await req.json();

  const note = await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!note) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }
  await prisma.note.delete({
    where: { id },
  });
  return Response.json({ success: true });
}

export async function PUT(req: Request) {
  const { id, title, userId } = await req.json();
  const existingNote = await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!existingNote) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }
  const note = await prisma.note.update({
    where: { id },
    data: { title },
  });
  return Response.json(note);
}