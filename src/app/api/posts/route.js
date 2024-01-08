import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function GET(request, response) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        subreddit: true,
        user: true,
        votes: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });

    // votesCount & commentscount for each post
    allposts = posts.map((post) => {
      const votesCount = post.votes.reduce(
        (count, vote) => count + (vote.isUpvote ? 1 : -1),
        0
      );
      const commentsCount = post.comments.length;
      return { ...post, votesCount, commentsCount };
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// create new post
export async function POST(request, response) {
  try {
    const { subredditId, title, message, parentId } = await request.json();

    const user = await fetchUser();

    //no title provided?

    if (!subredditId) {
      return NextResponse.json({
        success: false,
        error: "Please select a subreddit.",
      });
    }

    if (!title) {
      return NextResponse.json({
        success: false,
        error: "Please give the post a title.",
      });
    }

    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "Please login.",
      });
    }

    const newPost = await prisma.post.create({
      data: { title, userId: user.id, message, subredditId, parentId },
    });

    return NextResponse.json({ success: true, newPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
