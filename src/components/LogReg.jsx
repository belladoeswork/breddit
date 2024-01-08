"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link";

import Login from "@/app/login/page";
import Register from "@/app/register/page";
import UserMenu from "@/components/UserMenu.jsx";

export default function LogReg() {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegPopupOpen, setRegPopupOpen] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");

  const router = useRouter();

  const openLoginPopup = () => setLoginPopupOpen(!isLoginPopupOpen);
  const navigateToLogin = () => {
    setLoginPopupOpen(true);
    // router.push("/login", undefined, { shallow: true });
  };

  const handleLoginComplete = (username) => {
    setLoginPopupOpen(false);
    setUserUpdated(!userUpdated);
    setRegisteredUsername(username);
  };

  const openRegPopup = () => setRegPopupOpen(!isRegPopupOpen);
  const navigateToReg = () => {
    setRegPopupOpen(true);
    // router.push("/register", undefined, { shallow: true });
  };

  const handleRegistrationComplete = (username) => {
    setRegPopupOpen(false);
    setUserUpdated(!userUpdated);
    setRegisteredUsername(username);
  };

  return (
    <div className="logreg-container">
      {/* <Link href="/login" style={{textDecoration: "none"}} > */}
      <button className="login-button" onClick={navigateToLogin}>
        Log In
      </button>
      <Login
        toggle={openLoginPopup}
        onLoginComplete={handleLoginComplete}
        isLoginPopupOpen={isLoginPopupOpen}
      />
      {/* </Link> */}

      <button className="register-button" onClick={navigateToReg}>
        Sign Up
      </button>
      <Register
        toggle={openRegPopup}
        onRegistrationComplete={handleRegistrationComplete}
        isRegPopupOpen={isRegPopupOpen}
      />
      {userUpdated && (
        <UserMenu
          userUpdated={userUpdated}
          registeredUsername={registeredUsername}
        />
      )}
    </div>
  );
}
