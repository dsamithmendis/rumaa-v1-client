import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  senderID: { type: String, required: true },
  receiverID: { type: String, required: true },
  text: { type: String },
  images: { type: [String], default: [] },
  time: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model("chat-data", MessageSchema);
export default Message;
