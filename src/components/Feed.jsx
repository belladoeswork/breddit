import CreatePost from "@/components/CreatePost.jsx";
// import SortPostsFeed from "@/components/CreatePost.jsx";
import Posts from "@/app/posts/page";

export default function HomeFeed({ post }) {
  return (
    <div className="feedhome-container">
      <div className="center">
        <CreatePost />
        <Posts />
      </div>
    </div>
  );
}
