import Navbar from "@/components/Navbar.jsx";
import Subreddits from "@/app/subreddits/page";
import SideBar from "@/app/sidebar/page";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="rightfeed-section">
          <Subreddits />
          <SideBar userLoggedIn={false} />
        </div>
        {children}
      </div>
    </div>
  );
}
