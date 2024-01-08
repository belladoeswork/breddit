"use client";

import Link from "next/link";
import redditFace from "@/../public/redditFace.svg";
import bg from "@/../public/redditbg.jpg";
import Image from "next/image";
import { fetchUser } from "@/lib/fetchUser.js";
import CreateSub from "@/components/CreateSub.jsx";
import { useState, useEffect } from "react";

export default function SideBar({ userLoggedIn }) {
  const [showCreateSub, setShowCreateSub] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [userLoggedIn]);

  return (
    <div className="communities-section">
      <Image
        src={bg}
        alt="cover img"
        style={{ objectFit: "cover" }}
        width={250}
        height={90}
      />

      <div className="logo-section">
        <Link href="/">
          <Image
            src={redditFace}
            alt="Reddit Logo"
            className="logo"
            width={42}
            height={42}
          />
        </Link>
        <h4>Home</h4>
      </div>
      <div className="text-section">
        <p>Your personal Reddit frontpage, built for you.</p>
      </div>
      <div className="buttons-section">
        <button
          className="buttons-community"
          onClick={() => setShowCreateSub(true)}
        >
          Create Community
        </button>
        {showCreateSub && (
          <CreateSub user={user} setShowCreateSub={setShowCreateSub} />
        )}

        <button className="buttons-post">Create Post</button>
      </div>
    </div>
  );
}
