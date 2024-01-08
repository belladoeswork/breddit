import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

//update votes
export async function POST(request, response) {
  try {
    const user = await fetchUser();
    const { postId, isUpvote } = await request.json();
    const userId = user.id;
    let newVote;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: " Please login!",
      });
    }

    if (!postId) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    if (typeof isUpvote !== "boolean") {
      return NextResponse.json({
        success: false,
        error: "Wrong type for isUpvote",
      });
    }

    const existingVote = await prisma.vote.findFirst({
      where: { userId, postId },
    });

    if (existingVote) {
      if (existingVote.isUpvote === isUpvote) {
        newVote = await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        newVote = await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            isUpvote,
          },
        });
      }
    } else {
      newVote = await prisma.vote.create({
        data: {
          userId,
          postId,
          isUpvote,
        },
      });
    }

    return NextResponse.json({ success: true, newVote });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
