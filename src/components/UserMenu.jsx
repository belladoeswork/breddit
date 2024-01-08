"use client";
import { useRouter } from "next/navigation.js";

import { useState, useEffect } from "react";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Logout from "@/components/Logout.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function UserMenu({
  userUpdated,
  registeredUsername,
  setUserUpdated,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
  }, [userUpdated]);

  useEffect(() => {}, [userUpdated, registeredUsername]);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleToggle} className="options">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="icon-spacing"
          size="2x"
        />
        <FontAwesomeIcon icon={faAngleDown} className="dropdown-icon" />
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#fff",
            padding: "16px",
          }}
        >
          <p>Welcome, {user.username}!</p>
          <Logout />
        </div>
      )}
    </div>
  );
}
