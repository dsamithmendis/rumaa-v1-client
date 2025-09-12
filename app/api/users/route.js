import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";

export async function GET() {
  try {
    await connectDB();
    const users = await Register.find({}, { username: 1, userID: 1, _id: 0 });

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}
