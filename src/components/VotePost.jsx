"use client";

import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
// import { fetchUser } from  "@/lib/fetchUser.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faShare,
  faEllipsisH,
  faLongArrowAltUp,
  faLongArrowAltDown,
} from "@fortawesome/free-solid-svg-icons";

export default function VotePost({ post, user }) {
  const initialVotesCount = post.votes.reduce(
    (count, vote) => (vote.isUpvote ? count + 1 : count - 1),
    0
  );
  const [votes, setVotes] = useState(initialVotesCount);
  const [isUpVote, setIsUpVote] = useState(null);
  const [voted, setVoted] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setVoted(user.isUpvote);
    }
    router.refresh();
  }, []);

  async function handleUpButton() {
    if (user.id) {
      const existingVote = post.votes.find((vote) => vote.userId === user.id);
      if (existingVote && existingVote.isUpvote) {
        alert("You have already upvoted this post.");
      }

      await fetch("/api/votes", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, isUpvote: true }),
      });

      if (voted === true) {
        setVotes(votes - 1);
        setVoted(null);
        return setIsUpVote(null);
      } else if (voted === false) {
        setVotes(votes + 2);
      } else {
        setVotes(votes + 1);
      }

      setVoted(true);
      setIsUpVote(true);
    } else {
      setError("Please login to vote!");
    }
  }

  async function handleDownButton() {
    if (user.id) {
      const existingVote = post.votes.find((vote) => vote.userId === user.id);
      if (existingVote && !existingVote.isUpvote) {
        alert("You have already downvoted this post.");
      }

      await fetch("api/votes", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id, isUpvote: false }),
      });

      if (voted === true) {
        setVotes(votes - 2);
      } else if (voted === false) {
        setVotes(votes + 1);
        setVoted(null);
        return setIsUpVote(null);
      } else {
        setVotes(votes - 1);
      }
      setVoted(false);
      setIsUpVote(false);
    } else {
      setError("You need to login to vote!");
    }
  }

  return (
    <div className="post-votes">
      <div className="up-votes">
        <FontAwesomeIcon icon={faLongArrowAltUp} onClick={handleUpButton} />
      </div>
      <p> {votes}</p>
      <div className="down-votes">
        <FontAwesomeIcon icon={faLongArrowAltDown} onClick={handleDownButton} />
      </div>
    </div>
  );
}
