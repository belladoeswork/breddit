"use client";

import { useRouter } from "next/navigation.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeletePost({ post, user }) {
  const router = useRouter();

  async function handleDelete() {
    if (user.id !== post.user.id) {
      return;
    }

    try {
      console.log(`Deleting post with id: ${post.id}`);
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push("/");
    } catch (error) {
      console.error("An error occurred while deleting the post:", error);
    }
  }

  return (
    <div className="detpost-share">
      <FontAwesomeIcon onClick={handleDelete} icon={faTrash} />
    </div>
  );
}
