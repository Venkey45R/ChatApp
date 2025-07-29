import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Sun, Moon, User } from "lucide-react"; // Added Sun and Moon for dark mode toggle

function NavBar() {
  const { logout, authUser } = useAuthStore();
  // Placeholder for dark mode state and toggle function
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark"); // Toggles dark class on html element
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b shadow-lg bg-deep-ocean-blue border-secondary-teal/20 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        {/* Left Side - Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-all hover:opacity-90"
        >
          <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-soft-teal/20">
            <MessageSquare className="w-5 h-5 text-soft-teal" />
          </div>
          <h1 className="text-lg font-bold tracking-wide text-white">
            Chat App
          </h1>
        </Link>

        {/* Right Side - Nav Links and Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-white transition-colors duration-200 rounded-full hover:bg-soft-teal/30 focus:outline-none focus:ring-2 focus:ring-soft-teal"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 p-2 px-3 text-sm font-medium text-white transition-colors duration-200 rounded-full bg-soft-teal/80 hover:bg-soft-teal"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 p-2 px-3 text-sm font-medium text-white transition-colors duration-200 bg-red-600 rounded-full hover:bg-red-700"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
