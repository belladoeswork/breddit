import { prisma } from "@/lib/prisma.js";
import Post from "@/components/Post.jsx";
import DetailedPost from "@/components/DetailedPost.jsx";
import CreateComment from "@/components/CreateComment.jsx";
import PostComments from "@/components/PostComments.jsx";

import Layout from "@/components/Layout.jsx";
import { fetchUser } from "@/lib/fetchUser.js";


async function countComments(postId) {
  let count = 0;
  const comments = await prisma.post.findMany({
    where: {
      parentId: postId,
    },
  });
  count += comments.length;
  for (let comment of comments) {
    count += await countComments(comment.id);
  }
  return count;
}

export default async function postView({ params, votes }) {
  const { subredditId, postId } = params;
  const user = await fetchUser();

  const Votes = await prisma.vote.findMany();

  let post = await prisma.post.findFirst({
    where: { id: postId, parentId: null },
    include: {
      subreddit: true,
      user: true,
      votes: true,
      comments: {
        include: {
          user: true,
        },
      },
      children: {
        include: {
          user: true,
        },

        orderBy: {
          createAt: "desc",
        },
      },
    },
  });

  // count votes
  const postVotes = Votes.filter((vote) => vote.postId === postId);

  let votesCount = 0;

  // include replies to comments in count?
  for (let i = 0; i < postVotes.length; i++) {
    if (postVotes[i].isUpvote === true) {
      votesCount += 1;
    } else if (postVotes[i].isUpvote === false) {
      votesCount -= 1;
    }

    votesCount;
  }

  // count comments
  let commentsCount = await countComments(postId);

  // user vote on post?
  let userVote;
  if (user.id) {
    userVote = await prisma.vote.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });
  }

  return (
    <Layout>
      <div className="display-post">
        <div key={post.id} className="post-item">
          <DetailedPost
            key={post.id}
            post={post}
            commentsCount={commentsCount}
            votesCount={votesCount}
            userVote={userVote}
            user={user}
            subreddit={post.subreddit}
          />
        </div>

        <div className="comments">
          <CreateComment post={post} user={user} subredditId={subredditId} />
        </div>
        <hr></hr>
        {post.comments.map((comment) => (
          <PostComments
            key={comment.id}
            comment={comment}
            votes={votes}
            user={user}
            subredditId={subredditId}
          />
        ))}
      </div>
    </Layout>
  );
}
