"use client";

import { useState, useRef, useEffect } from "react";
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
import Link from "next/link";
// import JoinSub from '@/components/JoinSub.jsx';
import VotePost from "@/components/VotePost.jsx";
// import Actions from '@/components/Actions.jsx';

// import { fetchUser } from  "@/lib/fetchUser.js";

import { formatDistanceToNow } from "date-fns";

export function formatTimeAgo(date) {
  const now = new Date();
  const diffInDays = Math.round((now - date) / (1000 * 60 * 60 * 24));
  const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
  const diffInMinutes = Math.round((now - date) / (1000 * 60));

  if (diffInDays >= 365) {
    return Math.round(diffInDays / 365) + "yr ago";
  } else if (diffInDays >= 100) {
    return diffInDays + "d ago";
  } else if (diffInDays >= 1) {
    return diffInDays + " day" + (diffInDays > 1 ? "s" : "") + " ago ";
  } else if (diffInHours >= 1) {
    return diffInHours + " hr. ago";
  } else if (diffInMinutes <= 1) {
    return diffInMinutes + " min." + " ago ";
  } else {
    return diffInMinutes + " mins ago ";
  }
}

export default function SubPosts({ post, user, subreddit }) {
  const votesCount = post.votes.reduce(
    (count, vote) => (vote.isUpvote ? count + 1 : count - 1),
    0
  );
  const commentsCount = post.comments.length;

  return (
    <Link
      href={`${subreddit.id}/${post.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="post-container">
        <div className="post-header">
          <div className="left-header">
            <FontAwesomeIcon icon={faRedditAlien} size="2x" />
            <p className="post-sub">u/{post.user.username} </p>
            <p className="post-info">
              · {formatTimeAgo(new Date(post.createAt))}{" "}
            </p>
          </div>
          <div className="right-header">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
        </div>
        <h4 className="post-title">{post.title}</h4>
        <div className="post-footer">
          <VotePost post={post} user={user} votesCount={votesCount} />
          <div className="post-comments">
            <p> {commentsCount}</p>
            <FontAwesomeIcon icon={faComment} />
          </div>
          <div className="post-share">
            <FontAwesomeIcon icon={faShare} /> Share
          </div>
        </div>
      </div>
    </Link>
  );
}
