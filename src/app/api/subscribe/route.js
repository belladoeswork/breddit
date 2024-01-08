// import { prisma } from "@/lib/prisma.js";
// import { NextResponse } from "next/server.js";

// export async function POST(request, response) {
//   const { subredditId, userId } = request.body;

//   await prisma.subreddit.update({
//     where: { id: subredditId },
//     data: { subscribers: { connect: { id: userId } } },
//   });

//   return NextResponse.json({ success: true, message: "Subscribed successfully" });
// }
