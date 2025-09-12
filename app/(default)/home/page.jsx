"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiHeartLine,
  RiHeartFill,
  RiChat3Line,
  RiChat3Fill,
  RiShareForwardLine,
  RiSendPlaneFill,
  RiUpload2Line,
  RiCloseLine,
} from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      router.replace("/login");
    } else {
      setUserID(storedUserID);
    }
  }, [router]);

  if (!userID) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Rumaa</h1>
      <p className="text-gray-600">Your one-stop solution for all your needs.</p>
      <p className="text-sm text-gray-500">Logged in as: {userID}</p>

      <PostContainer userID={userID} />
    </div>
  );
}

function PostContainer({ userID }) {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleLike = () => setLiked(!liked);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSendComment = () => {
    if (comment.trim() === "" && images.length === 0) return;
    alert(`User ${userID} sent: ${comment}, ${images.length} image(s) attached`);
    setComment("");
    setImages([]);
    setImagePreviews([]);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
      const newPreviews = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShare = () => alert("Post shared!");
  const toggleComment = () => setShowComment(!showComment);

  return (
    <div className="border rounded-lg p-4 shadow-md max-w-md">
      <div className="mb-4">
        <textarea
          placeholder="What's on your mind?"
          className="w-full border rounded p-2 resize-none focus:outline-none focus:ring"
          rows={3}
        />
      </div>

      {imagePreviews.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {imagePreviews.map((preview, index) => (
            <div key={preview + index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-32 h-32 object-cover rounded"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <RiCloseLine size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-red-500"
          >
            {liked ? <RiHeartFill size={24} /> : <RiHeartLine size={24} />}
            <span>{liked ? "Liked" : "Like"}</span>
          </button>

          <button
            onClick={toggleComment}
            className={`flex items-center space-x-1 ${
              showComment ? "text-blue-700 font-semibold" : "text-blue-500"
            }`}
          >
            {showComment ? <RiChat3Fill size={24} /> : <RiChat3Line size={24} />}
            <span>Comment</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-green-500"
          >
            <RiShareForwardLine size={24} />
            <span>Share</span>
          </button>
        </div>

        <label className="cursor-pointer flex items-center space-x-1 text-gray-600 hover:text-gray-800">
          <RiUpload2Line size={20} />
          <span>Upload</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {showComment && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={handleCommentChange}
            className="flex-1 border rounded p-2 focus:outline-none focus:ring"
          />
          <button
            onClick={handleSendComment}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <RiSendPlaneFill size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
