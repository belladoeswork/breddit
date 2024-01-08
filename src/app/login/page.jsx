"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();

    if (info.error) {
      setError(info.error);
    } else {
      props.onLoginComplete(username);
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
      style={{ display: props.isLoginPopupOpen ? "block" : "none" }}
    >
      <div className="popup-inner">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label> Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label> Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="confirm">
            <button className="login-submit" type="submit">
              Login
            </button>
            <p className="text-submit">
              New Here? &nbsp;
              <Link href={"/register"} style={{ textDecoration: "none" }}>
                {" "}
                Register{" "}
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
