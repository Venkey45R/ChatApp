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
            <h1 className="text-2xl font-semibold text-center text-text-primary">
              Update Profile Picture
            </h1>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 my-8">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.webp"}
                alt="profile"
                className="object-cover border-2 rounded-full shadow-lg size-36"
              />
              <label
                htmlFor="avatar-upload"
                className={`rounded-full cursor-pointer transition duration-300 mt-3 px-3 py-1 bg-dark-background border shadow-md flex items-center justify-center
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
                  <div className="flex justify-between gap-2">
                    <Camera className="mt-0.5 size-5" />
                    <h4>Update Profile</h4>
                  </div>
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
          </div>

          {/* Profile Info */}
          <div className="space-y-3">
            <div className="flex flex-col mb-8 lg:mb-4 lg:flex-row lg:justify-between lg:gap-3">
              {/* Full Name */}
              <div className="w-full mb-2 lg:w-1/4 lg:mb-0 rounded-2xl bg-white/20">
                <label className="flex items-center gap-2 px-4 py-2 text-sm font-bold border rounded-2xl">
                  <User className="mt-0.5 size-4" />
                  <p className="text-base font-normal">FullName</p>
                </label>
              </div>
              {/* Input */}
              <div className="w-full lg:w-3/4">
                <input
                  type="text"
                  className="w-full p-2 pl-5 border cursor-not-allowed rounded-2xl"
                  value={authUser?.fullName}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-3">
              {/* Email */}
              <div className="w-full mb-2 lg:w-1/4 lg:mb-0 rounded-2xl bg-white/20">
                <label className="flex items-center gap-2 px-4 py-2 text-sm font-bold border rounded-2xl">
                  <Mail className="mt-0.5 size-4" />
                  <p className="text-base font-normal">Email</p>
                </label>
              </div>
              {/* Input */}
              <div className="w-full lg:w-3/4">
                <input
                  type="email"
                  className="w-full p-2 pl-5 border cursor-not-allowed rounded-2xl"
                  value={authUser?.email}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="pt-6 mt-4">
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
