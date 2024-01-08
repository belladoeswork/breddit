import { prisma } from "@/lib/prisma.js";
import Link from "next/link";
import redditFace from "@/../public/redditFace.svg";
import Image from "next/image";
import bgimg from "@/../public/bgimg.webp";
import JoinSub from "@/components/JoinSub.jsx";
import Feed from "@/components/Feed.jsx";

import Post from "@/components/Post.jsx";
import SortPostsBy from "@/components/SortPostsBy.jsx";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Posts() {
  const user = await fetchUser();

  let post = await prisma.post.findMany({
    include: {
      subreddit: true,
      user: true,
      votes: true,
      comments: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div className="feed-section">
      {/* <SortPostsBy  /> */}
      <div className="posts-list">
        {post.map((post) => (
          <div key={post.id} className="post-item">
            <Post
              key={post.id}
              post={post}
              subreddit={post.subreddit}
              vote={post.votescount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <div>
                {comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div> */
}
