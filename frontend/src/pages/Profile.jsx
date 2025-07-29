import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

function Profile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image);
      await updateProfile({ profilePic: base64image });
    };
  };

  return (
    <div className="min-h-screen pt-24 bg-base-100">
      <div className="max-w-2xl px-4 mx-auto">
        <div className="p-6 shadow-lg card bg-base-200">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content">Profile</h1>
            <p className="mt-1 text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3 my-6">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="profile"
                className="object-cover w-32 h-32 border-4 rounded-full border-base-content"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content text-base-100 p-2 rounded-full cursor-pointer transition duration-200 hover:scale-105 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-4 h-4" />
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
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Updating..." : "Click the icon to upload"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm label text-base-content/60">
                <User className="w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full input input-bordered bg-base-100"
                value={authUser?.fullName}
                disabled
              />
            </div>

            <div>
              <label className="text-sm label text-base-content/60">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                className="w-full input input-bordered bg-base-100"
                value={authUser?.email}
                disabled
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold text-base-content">Account Information</h2>
            <div className="text-sm divide-y divide-base-300">
              <div className="flex justify-between py-2">
                <span className="text-base-content/80">Member Since</span>
                <span className="text-base-content/70">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-base-content/80">Account Status</span>
                <span className="text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
