"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faComment } from "@fortawesome/free-regular-svg-icons";

export default function NewComment({ post, user, subredditId }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const [showInput, setShowInput] = useState(false);

  const router = useRouter();

  async function submitComment(event) {
    event.preventDefault();

    if (!user) {
      return setError("Please login!");
    }

    if (commentText) {
      const response = await fetch("/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          subredditId,
          parentId: post.id,
        }),
      });

      const info = await response.json();

      if (info.success) {
        setCommentText("");
        setShowInput(false);
        router.refresh();
      } else {
        setError(info.error);
      }
    }
  }

  return (
    <div>
      <form className="comment-form" onSubmit={submitComment}>
        <p> Reply as u/{user.username}</p>
        <textarea
          className="comment-input"
          placeholder="What are your thoughts?"
          type="text"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        ></textarea>
        {error && <p>{error}</p>}
        <div className="comment-buttons">
          <button type="submit" className="join-bttn">
            {" "}
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
