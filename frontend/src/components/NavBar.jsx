import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Sun, Moon, User } from "lucide-react";

function NavBar() {
  const { logout, authUser } = useAuthStore();

  // Initialize dark mode from localStorage or default to true (dark theme)
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialMode = storedTheme === "light" ? false : true;

    if (initialMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return initialMode;
  });

  // This useEffect now explicitly updates the 'dark' class on the HTML element
  // and updates localStorage whenever isDarkMode state changes.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]); // Dependency on isDarkMode state

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the state
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b shadow-lg bg-component-bg border-soft-teal/30 backdrop-blur-sm">
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto max-w-7xl">
        {/* Left Side - Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-all hover:opacity-90"
        >
          <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-soft-teal/20">
            <MessageSquare className="w-5 h-5 text-soft-teal" />
          </div>
          <h1 className="font-sans text-xl font-bold tracking-wide text-text-primary">
            Chat App
          </h1>
        </Link>

        {/* Right Side - Nav Links and Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle Button - explicitly set colors */}
          <button
            onClick={toggleDarkMode}
            className="p-2 transition-colors duration-200 rounded-full text-text-primary hover:bg-soft-teal/30 focus:outline-none focus:ring-2 focus:ring-soft-teal"
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
              {/* Profile Link Button - explicitly set colors */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 transform rounded-full shadow-md text-deep-ocean-blue bg-soft-teal hover:bg-soft-teal/90 hover:scale-105"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              {/* Log Out Button - explicitly set colors */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-200 transform bg-red-600 rounded-full shadow-md hover:bg-red-700 hover:scale-105"
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
