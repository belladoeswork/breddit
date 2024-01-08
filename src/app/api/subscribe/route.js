import { prisma } from "@/lib/prisma.js";

export default async function handler(request, response) {
  const { subredditId, userId } = request.body;

  await prisma.subreddit.update({
    where: { id: subredditId },
    data: { subscribers: { connect: { id: userId } } },
  });

  res.status(200).json({ message: "Subscribed successfully" });
}
