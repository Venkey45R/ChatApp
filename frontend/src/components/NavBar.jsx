import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, Sun, Moon, User, MessageCircleMore } from "lucide-react";
import logo from "../assets/logo.png";

function NavBar() {
  const { logout, authUser } = useAuthStore();

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b shadow-lg bg-component-bg backdrop-blur-3xl">
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto max-w-7xl">
        <Link
          to="/"
          className="flex items-center gap-2 transition-all hover:opacity-90"
          aria-label="Go to home"
        >
          <img src={logo} alt="Huddle Logo" className="w-auto h-10" />
        </Link>

        <div className="flex items-center gap-3">
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
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 transform rounded-full shadow-md text-deep-ocean-blue bg-soft-teal hover:bg-soft-teal/90 hover:scale-105"
                aria-label="Go to profile"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-200 transform bg-red-600 rounded-full shadow-md hover:bg-red-700 hover:scale-105"
                aria-label="Log out"
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
