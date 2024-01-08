import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from  "@/lib/fetchUser.js";



//get all subs
export async function GET(request, response) {
  try {
    const subreddits = await prisma.subreddit.findMany();
    return NextResponse.json({ success: true, subreddits }); 
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// create sub
export async function POST(request, response) {
  
  try {
    const { name } = await request.json();
    // const { userId, subredditId } = request.json();

    const user = await fetchUser();

    //no name provided?

    if (!name) {
      return NextResponse.json({
        success: false,
        error: "Please give your community a name.",
      });
    }

    // no user?
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Please login.",
      });
    }

    // sub already exist?
    const subExist = await prisma.subreddit.findFirst({ where: { name } });

    if (subExist) {
      return NextResponse.json({
        success: false,
        error: "Community name already used.",
      });
    }


    const sub = await prisma.subreddit.create({ data: { name, userId: user.id} });

    return NextResponse.json({ success: true, sub });

  } catch (error) {

    return (

        NextResponse.json({ success: false, error: error.message })
    );
  }
}

