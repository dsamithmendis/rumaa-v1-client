import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, name, surname, mobile, email, password, gender, city } = await req.json();

  try {
    await connectDB();
    await Register.create({ username, name, surname, mobile, email, password, gender, city });

    return NextResponse.json({
      msg: ["Registered successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList, success: false });
    } else {
      return NextResponse.json({ msg: ["Unable to register user."], success: false });
    }
  }
}
