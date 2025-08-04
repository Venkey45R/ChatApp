import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedUser } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) {
      return;
    }
    if (!selectedUser) {
      toast.error("Please select a user to chat with.");
      return;
    }
    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setIsSending(false);
    }
  };

  const isDisabled = !selectedUser || isSending;

  return (
    <div className="w-full p-4 border-t shadow-lg bg-card-bg border-soft-teal/30">
      {imagePreview && (
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="object-cover border rounded-lg shadow-inner border-border-color size-20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-gray-600 text-white flex items-center justify-center border border-gray-500 hover:bg-gray-500 transition-colors"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 p-1.5 border border-border-color rounded-full bg-input-bg shadow-inner"
      >
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            className="w-full h-10 px-4 bg-transparent rounded-full text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-soft-teal"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isDisabled}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isDisabled}
          />
          <button
            type="button"
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 
              ${
                imagePreview
                  ? "text-soft-teal bg-soft-teal/20"
                  : "text-text-muted hover:bg-gray-700"
              }
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isDisabled}
            aria-label="Attach image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 transition-colors duration-200 rounded-full shadow-md bg-soft-teal text-deep-ocean-blue hover:bg-soft-teal/90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={(!text.trim() && !imagePreview) || isDisabled}
          aria-label="Send message"
        >
          {isSending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
