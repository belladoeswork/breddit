import { prisma } from "@/lib/prisma.js";
import Link from "next/link";
import redditFace from "@/../public/redditFace.svg";
import Image from "next/image";
import bgimg from "@/../public/bgimg.webp";
import JoinSub from "@/components/JoinSub.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Subreddits() {
  // fetch from  db
  const subreddits = await prisma.subreddit.findMany({
    include: {
      subscribers: true,
    },
  });

  const user = await fetchUser();

  subreddits.sort((a, b) => b.subscribers.length - a.subscribers.length);

  return (
    <div className="communities-section">
      <Image
        src={bgimg}
        alt="cover img"
        style={{ objectFit: "cover" }}
        width={250}
        height={90}
      />
      <h4>Top Communities</h4>
      <div className="subreddit-list">
        {subreddits.map((subreddit) => (
          <div key={subreddit.id} className="subreddit-item">
            <Image
              src={redditFace}
              alt="Reddit Logo"
              className="comlogo"
              width={25}
              height={25}
            />

            <Link
              href={`/subreddits/${subreddit.id}`}
              style={{ textDecoration: "none" }}
            >
              <span className="subreddit-name"> r/{subreddit.name} </span>
              <p>{subreddit.subscribers.length} members</p>
            </Link>

            <Link
              href={`/subreddits/${subreddit.id}`}
              style={{ textDecoration: "none" }}
            >
                    {/* <JoinSub className="join-bttn" subredditId={subreddit.id} /> */}
                    <JoinSub className="join-bttn" subredditId={subreddit.id} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
