import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "./skeleton/SideBarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function SideBar() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const users = useChatStore((state) => state.users);
  const getUsers = useChatStore((state) => state.getUsers);
  const isUsersLoading = useChatStore((state) => state.isUsersLoading);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return <SideBarSkeleton />;
  }

  return (
    <aside className="flex flex-col w-20 h-full transition-all duration-300 ease-in-out border-r rounded-l-lg shadow-lg lg:w-72 bg-card-bg border-soft-teal/30">
      <div className="flex items-center w-full gap-3 p-5 border-b border-soft-teal/30">
        <Users className="flex-shrink-0 size-6 text-soft-teal" />
        <span className="hidden text-lg font-semibold text-text-primary lg:block">
          Contacts
        </span>
      </div>
      <div className="flex flex-col items-center gap-3 px-1 py-2 border-b lg:px-5 lg:flex-row lg:items-center border-soft-teal/30">
        {/* Checkbox label */}
        <label className="flex items-center w-full gap-2 text-xs font-normal cursor-pointer lg:text-sm lg:font-medium text-text-primary lg:w-auto">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="transition-all duration-200 border-2 border-gray-400 rounded-none appearance-none cursor-pointer lg:rounded-full size-5 lg:size-3 checked:bg-gray-700 checked:border-transparent dark:border-gray-600 dark:checked:bg-gray-600"
          />
          <p>Show Online users only</p>
        </label>
        {/* Online users count */}
        <span className="mt-0 text-xs text-zinc-500">
          ({onlineUsers.length - 1} online)
        </span>
      </div>
      <div className="flex-1 w-full py-3 overflow-y-auto custom-scrollbar">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-soft-teal 
              ${
                selectedUser?._id === user._id
                  ? "bg-soft-teal/20 text-soft-teal border-l-4 border-soft-teal shadow-inner"
                  : "hover:bg-white/20 text-text-primary"
              }`}
          >
            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.webp"}
                alt={user.fullName}
                className="object-cover border-2 rounded-full shadow-sm size-12 border-border-color"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-card-bg animate-pulse"></span>
              )}
            </div>
            <div className="hidden min-w-0 text-left lg:block">
              <div className="text-base font-medium truncate text-text-primary">
                {user.fullName}
              </div>
              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-400"
                    : "text-text-muted"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="py-4 text-center text-zinc-500">No Online Users</div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
