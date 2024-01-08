"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faShare,
  faEllipsisH,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import JoinSub from '@/components/JoinSub.jsx';
import VotePost from "@/components/VotePost.jsx";
import CreatePost from "@/components/CreatePost.jsx";
import DeletePost from "@/components/DeletePost.jsx";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import { formatDistanceToNow } from "date-fns";

function formatTimeAgo(date) {
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

export default function DetailedPost({ post, user, subreddit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const [selectedSub, setSelectedSub] = useState(post.subreddit.id);

  const [error, setError] = useState("");

  const router = useRouter();

  function handleEdit() {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }

  async function handleEditPost(e) {
    e.preventDefault();
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
      }),
    });
    const info = await response.json();

    if (info.success) {
      setIsEditing(false);
      router.refresh();
    } else {
      return setError(info.error);
    }
  }

  const votesCount = post.votes.reduce(
    (count, vote) => (vote.isUpvote ? count + 1 : count - 1),
    0
  );
  const commentsCount = post.comments.length;

  return (
    <div>
      <div className="detpost-container">
        <div className="detpost-header">
          <div className="left-header">
            <FontAwesomeIcon icon={faRedditAlien} size="2x" />
            <Link
              style={{ textDecoration: "none" }}
              href={`/subreddits/${subreddit.id}`}
            >
              <p className="post-sub"> r/{post.subreddit?.name} </p>
            </Link>
            <p className="post-text">by u/{post.user.username}</p>
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
        {!isEditing ? (
          <div>
            <h2 className="detpost-title">{post.title}</h2>
            <span className="detpost-text">{post.message}</span>
          </div>
        ) : (
          <div>
            <h2 className="detpost-title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </h2>
            <span className="detpost-text">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </span>
            <button className="detpost-share" onClick={handleEditPost}>
              Save
            </button>
          </div>
        )}
        <div className="post-footer">
          <VotePost post={post} user={user} votesCount={votesCount} />
          <div className="detpost-comments">
            <p> {commentsCount} </p>
            <FontAwesomeIcon icon={faComment} />
          </div>
          <div className="detpost-share">
            <FontAwesomeIcon icon={faShare} /> Share
          </div>

          {user.id === post.user.id && !isEditing ? (
            <div className="detpost-share">
              <div className="detpost-share">
                <FontAwesomeIcon
                  onClick={() => setIsEditing(!isEditing)}
                  icon={faPenToSquare}
                />
              </div>
              <div className="detpost-share">
                <DeletePost post={post} user={user} postId={post.id} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}
