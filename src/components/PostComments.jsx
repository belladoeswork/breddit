import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faComment } from "@fortawesome/free-regular-svg-icons";
import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import PostComments from "@/components/PostComments.jsx";

import Link from "next/link";

function formatTimeAgo(date) {
  const now = new Date();
  const diffInDays = Math.round((now - date) / (1000 * 60 * 60 * 24));
  const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
  const diffInMinutes = Math.round((now - date) / (1000 * 60));

  if (diffInDays >= 365) {
    return Math.round(diffInDays / 365) + "yr ago";
  } else if (diffInDays >= 100) {
    return diffInDays + "d ago";
  } else if (diffInDays >= 1) {
    return diffInDays + " day" + (diffInDays > 1 ? "s" : "") + " ago ";
  } else if (diffInHours >= 1) {
    return diffInHours + " hr. ago";
  } else if (diffInMinutes <= 1) {
    return diffInMinutes + " min." + " ago ";
  } else {
    return diffInMinutes + " mins ago ";
  }
}

export default async function postComments({
  comment,
  votes,
  user,
  comments,
  subredditId,
}) {
  let User = await fetchUser();

  if (user.id) {
    User = await prisma.vote.findFirst({
      where: {
        postId: comment.id,
        userId: user.id,
      },
    });
  }

  return (
    <div>
      <div className="post-container">
        <div className="post-header">
          <div className="left-header">
            <p> u/{comment.user.username} </p>
            <p>· {formatTimeAgo(new Date(comment.createAt))} </p>
          </div>
        </div>

        <span> {comment.text} </span>
      </div>
    </div>
  );
}
