import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function Profile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image);
      await updateProfile({ profilePic: base64image });
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12 bg-gray-background">
      <div className="w-full max-w-2xl">
        <div className="p-8 border shadow-2xl rounded-2xl bg-component-bg border-soft-teal/30 animate-fade-in">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-text-primary">
              Your Profile
            </h1>
            <p className="mt-2 text-lg text-text-muted">
              Manage your personal information
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 my-8">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="profile"
                className="object-cover border-4 rounded-full shadow-lg w-36 h-36 border-soft-teal"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-soft-teal text-deep-ocean-blue p-3 rounded-full cursor-pointer transition duration-300 hover:scale-110 shadow-md flex items-center justify-center
                  ${
                    isUpdatingProfile
                      ? "animate-pulse opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                aria-label="Upload new profile picture"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-text-muted">
              {isUpdatingProfile
                ? "Updating new avatar..."
                : "Click the camera icon to update your profile picture"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-text-secondary">
                <User className="w-4 h-4 mr-2 text-soft-teal" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg cursor-not-allowed bg-input-bg border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-soft-teal"
                value={authUser?.fullName}
                disabled
              />
            </div>

            <div>
              <label className="flex items-center mb-2 text-sm font-medium text-text-secondary">
                <Mail className="w-4 h-4 mr-2 text-soft-teal" />
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg cursor-not-allowed bg-input-bg border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-soft-teal"
                value={authUser?.email}
                disabled
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="pt-6 mt-8 border-t border-border-color">
            <h2 className="mb-4 text-xl font-semibold text-text-primary">
              Account Information
            </h2>
            <div className="text-sm divide-y divide-border-color">
              <div className="flex justify-between py-3">
                <span className="text-text-muted">Member Since</span>
                <span className="font-medium text-muted-gold">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-text-muted">Account Status</span>
                <span className="font-medium text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
