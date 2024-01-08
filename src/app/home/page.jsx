import React from "react";
import NavBar from "@/components/NavBar.jsx";
import Subreddits from "@/app/subreddits/page";
import SideBar from "@/app/sidebar/page";

import Feed from "@/components/Feed.jsx";

export default function Home2() {
  return (
    <div>
      <NavBar />
      <div className="content-container">
        <Feed className="feed" />
        <div className="rightfeed-section">
          <Subreddits />
          <SideBar userLoggedIn={false} />
        </div>
      </div>
    </div>
  );
}
