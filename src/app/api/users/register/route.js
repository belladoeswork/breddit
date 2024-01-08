import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  try {
    const cookieStore = cookies();

    // no info to create account
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "Please provide a username and password to register",
      });
    }

    // check if user already exist
    const user = await prisma.user.findFirst({
      where: { username, password },
    });

    if (user) {
      return NextResponse.json({
        success: false,
        error: "Username already exists. Login instead?",
      });
    }

    // hash pwd
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    if (!newUser) {
      return NextResponse.json({
        success: false,
        error: "Failed to create user.",
      });
    }

    delete newUser.password;

    // token for new user
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

    cookieStore.set("token", token);

    return NextResponse.json({ success: true, newUser, token });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false, error: error.message });
  }
}
