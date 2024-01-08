import SearchBar from "@/components/SearchBar.jsx";
import LogReg from "@/components/LogReg.jsx";
import UserMenu from "@/components/UserMenu.jsx";
import Link from "next/link";
import Image from "next/image";
import redditFace from "@/../public/redditFace.svg";
import redditText from "@/../public/redditText.svg";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Navbar() {
  const user = await fetchUser();

  return (
    <div>
      <div className="navbar">
        <div className="left-section">
          <div className="home-container">
            <Link href="/">
              <Image
                src={redditFace}
                alt="Reddit Logo"
                className="logo"
                width={42}
                height={42}
              />
              <Image
                src={redditText}
                alt="Reddit Text"
                className="logo-text"
                width={62}
                height={42}
              />
            </Link>
          </div>
        </div>
        <div className="center-section">
          <SearchBar />
        </div>
        <div className="right-section">
          <div className="auth-section">
            {!user.id ? <LogReg /> : <UserMenu userUpdated={false} />}
          </div>
        </div>
      </div>
    </div>
  );
}
