import connectDB from "@/components/lib/mongodb";
import Register from "@/components/models/register";

export async function GET() {
  try {
    await connectDB();
    const users = await Register.find({}, { userID: 1, username: 1, _id: 0 });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
