import connectDB from "@/components/lib/mongodb";
import Message from "@/components/models/Message";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sender = searchParams.get("sender");
    const receiver = searchParams.get("receiver");

    if (!sender || !receiver) {
      return new Response(JSON.stringify({ error: "Missing sender or receiver" }), { status: 400 });
    }

    const messages = await Message.find({
      $or: [
        { senderID: sender, receiverID: receiver },
        { senderID: receiver, receiverID: sender },
      ],
    }).sort({ time: 1 });

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch messages" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { senderID, receiverID, text, images } = body;

    const newMsg = await Message.create({ senderID, receiverID, text, images });
    return new Response(JSON.stringify(newMsg), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
  }
}
