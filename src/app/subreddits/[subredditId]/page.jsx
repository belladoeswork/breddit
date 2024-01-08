import { prisma } from "@/lib/prisma.js";
import Link from "next/link";
import redditFace from "@/../public/redditFace.svg";
import Image from "next/image";
import bgimg from "@/../public/bgimg.webp";
import JoinSub from "@/components/JoinSub.jsx";
import Post from "@/components/Post.jsx";
import SubPosts from "@/components/SubPosts.jsx";
import Layout from "@/components/Layout.jsx";
// import CreatePost from "@/components/CreatePost.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Subreddit({ params }) {
  // posts associated to subreddit
  const { subredditId } = params;
  const user = await fetchUser();

  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
    select: { id: true,
      name: true, subscribers: true
    },
    
  });

  

  const posts = await prisma.post.findMany({
    where: { subredditId, parentId: null },
    include: {
      user: true,
      votes: true,
      comments: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <Layout>
      <div>
        <div className="sort-container">
          <div className="leftsub">
            <FontAwesomeIcon icon={faRedditAlien} size="4x" />
            <h2>r/{subreddit.name}</h2>
          </div>
          <div className="right-header">
            <JoinSub />
          </div>
        </div>
        <div className="subreddit-posts">
          {posts.map((post) => (
            <SubPosts
              post={post}
              subreddit={subreddit}
              vote={post.votesCount}
              comments={post.commentsCount}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
