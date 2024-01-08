"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();

    if (info.error) {
      setError(info.error);
    } else {
      props.onRegistrationComplete(username);
      props.toggle();
      router.push("/");
      router.refresh();
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div
      className="popup"
      style={{ display: props.isRegPopupOpen ? "block" : "none" }}
    >
      <div className="popup-inner">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="confirm">
            <button className="reg-submit" type="submit">
              Create Account
            </button>
            <p className="text-submit">
              Already have an account? &nbsp;
              <Link href={"/login"} style={{ textDecoration: "none" }}>
                Log In
              </Link>
            </p>
          </div>
        </form>
        <button className="close-button" onClick={props.toggle}>
          X
        </button>
      </div>
    </div>
  );
}
