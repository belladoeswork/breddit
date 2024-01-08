"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link";

export default function CreateSub({ user, setShowCreateSub }) {
  const [subName, setSubName] = useState("");
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleCreateSub(e) {
    e.preventDefault();

    setCreatePopupOpen(true);

    const response = await fetch("/api/subreddits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: subName,
      }),
    });

    const info = await response.json();

    if (info.success) {
      setShowCreateSub(false);
      router.push("/subreddits");
    } else {
      if (info.error.includes("Community name already used.")) {
        setError("Community name already used.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setCreatePopupOpen(false);
      router.refresh();
      setSubName("");
    }
  }

  return (
    <div className="popup">
      {!isCreatePopupOpen && (
        <div className="popup-inner">
          <h2>New Subreddit</h2>
          <p> Unleash your creativity</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleCreateSub}>
            <label>Name:</label>
            <input
              type="text"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
            />
            <div className="confirm">
              <button className="reg-submit" type="submit">
                Create Community
              </button>
              <p className="text-submit">
                Feeling adventurous? &nbsp;
                <Link href={"/subreddits"} style={{ textDecoration: "none" }}>
                  Join a community
                </Link>
              </p>
            </div>
          </form>
          <button
            className="close-button"
            onClick={() => setShowCreateSub(false)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
