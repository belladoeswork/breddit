import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from  "@/lib/fetchUser.js";


// update post
export async function PUT(request, response) {
  try {

    const { postId } = response.params;

    const { title, message } = await request.json();
    const user = await fetchUser();

    // post exist?
    const postExist = await prisma.post.findFirst({
      where: {
        id: postId,
      }
    })

    // post exist?
    if (!postExist) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    } 

    // user logged in?
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "Please login to edit the post",
      });
    } 

    // user did not create post?   
    if (user.id!== postExist.userId) {
      return NextResponse.json({
        success: false,
        error: "You cannot edit this post.",
      });
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { title, message },
    });

    return NextResponse.json({ success: true, updatePost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}




//delete post
export async function DELETE (request, response) {
  console.log("DELETE request received for post id:", response.params.postId); // Add this
    try {
        const { postId } = response.params;

        console.log(`Attempting to delete post with id: ${postId}`);

        const user = await fetchUser();
        console.log('Fetched user:', user);


        const post = await prisma.post.findFirst({
            where: {
                id: postId,
              }
        });
        console.log('Fetched post:', post);

        if (!post) {
          console.log(`No post found with id: ${postId}`);
            return NextResponse.json({
              success: false,
              message: "No post with that ID found.",
            });
          }
            // user did not create post?   
    if (user.id!== post.userId) {
      console.log('User does not have permission to delete this post');
      return NextResponse.json({
        success: false,
        error: "You cannot delete this post.",
      });
    }

    // user logged in?
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "Please login to delete the post",
      });
    }   
  
        const deletedPost = await prisma.post.delete({
            where: {
              id: postId,
            }
          });

          console.log(`Successfully deleted post with id: ${postId}`);


        return NextResponse.json({ success: true, deletedPost });

    } catch (error){
      console.log('An error occurred:', error);
        return NextResponse.json({ success: false, error: error.message });

    }
}
