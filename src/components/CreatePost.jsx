"use client";

import { useRouter } from "next/navigation.js";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faImage } from "@fortawesome/free-regular-svg-icons";

export default function CreatePost({ subreddit, post, postId }) {
  const [subreddits, setSubreddits] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const router = useRouter();

  async function fetchSubs() {
    try {
      const response = await fetch("/api/subreddits");

      if (!response.ok) {
        return error(` error! status: ${response.status}`);
      }

      const info = await response.json();
      setSubreddits(info.subreddits);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (!selectedSub || !title || !message) {
      return setError("Please enter all information to create a post");
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subredditId: selectedSub, title, message }),
    });

    console.log({ subredditId: selectedSub, title, message });

    const info = await response.json();

    if (info.error) {
      return setError(info.error);
    }

    console.log(info);

    setSelectedSub("");
    setTitle("");
    setMessage("");
    setError("");
    setIsPopupOpen(false);

    if (subreddit) {
      router.push(`/subreddits/${selectedSub}`);
    } else {
      router.push("/");
    }

    // router.refresh();

    setIsPopupOpen(false);
    router.refresh();
  }

  useEffect(() => {
    fetchSubs();
  }, []);

  useEffect(() => {
    if (subreddit) {
      setSelectedSub(subreddit.id);
    }
  }, [subreddit]);

  return (
    <div className="create-container">
      {!isPosting && !isPopupOpen ? (
        <div className="elements">
          <FontAwesomeIcon icon={faCircleUser} className="profile" />
          <input
            placeholder="Create Post"
            className="content-text"
            onClick={() => setIsPopupOpen(true)}
          />
          <FontAwesomeIcon icon={faImage} className="image-icon" />
        </div>
      ) : null}

      {isPopupOpen && (
        <div className="popup2">
          <div className="popup-inner2">
            <h2>Create Post</h2>
            <form onSubmit={handleCreate}>
              <div className="select-sub">
                <select
                  value={selectedSub}
                  onChange={(e) => setSelectedSub(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a community
                  </option>
                  {subreddits.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      r/{sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Text</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {error && <p>{error}</p>}
              <button className="bttn" type="submit">
                {" "}
                Create Post
              </button>
            </form>
            <button
              className="close-button2"
              onClick={() => setIsPopupOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
