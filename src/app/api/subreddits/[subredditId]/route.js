import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";


// join sub?

export async function POST(request, response) {
  const { userId } = request.body;
  const { subredditId } = request.params;

  try {
    // user has already joined the subreddit?
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId, subredditId },
    });

    if (existingSubscription) {
      return NextResponse.json({ success: false, error: "You have already joined this subreddit." });
    }

    // Create a new subscription
    await prisma.subscription.create({
      data: {
        userId,
            subredditId,
        
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}