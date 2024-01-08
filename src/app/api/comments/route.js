import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { text, subredditId, parentId } = await request.json();
    const user = await fetchUser();

    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "Please login.",
      });
    }

    const newComment = await prisma.comment.create({
      data: { text, userId: user.id, postId: parentId },
    });

    return NextResponse.json({ success: true, newComment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
