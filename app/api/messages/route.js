import connectDB from "@/components/lib/mongodb";
import Message from "@/components/models/Message";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const receiverID = searchParams.get("receiverID");

    if (!receiverID) {
      return new Response(JSON.stringify({ error: "Missing receiverID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const messages = await Message.find({ receiverID }).sort({ time: 1 });

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch messages:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
