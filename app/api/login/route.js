import { NextResponse } from "next/server";
import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        await connectDB();
        const user = await Register.findOne({ username });

        if (!user || user.password !== password) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Login successful" },
            { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message || "Server error" },
            { status: 500 }
        );
    }
}
