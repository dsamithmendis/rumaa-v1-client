import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    await connectDB();

    const user = await Register.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ msg: ["User not found"], success: false }),
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ msg: ["Invalid password"], success: false }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        msg: ["Login successful"],
        success: true,
        userID: user._id.toString(),
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ msg: ["Something went wrong"], success: false }),
      { status: 500 }
    );
  }
}
