import CreatePost from "@/components/CreatePost.jsx";
import SortPostsBy from "@/components/SortPostsBy.jsx";
import Posts from "@/app/posts/page";

export default function HomeFeed({ post }) {
  return (
    <div className="feedhome-container">
      <div className="center">
        <CreatePost />
        <SortPostsBy />
        <Posts />
      </div>
    </div>
  );
}
