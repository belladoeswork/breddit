import { NextResponse } from "next/server.js";
import { cookies } from "next/headers.js";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear the token cookie
    cookieStore.delete("token");

    return NextResponse.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
