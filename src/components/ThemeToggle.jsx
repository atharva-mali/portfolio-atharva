// src/components/ThemeToggle.jsx
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext'; // Import the custom hook

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Use the context

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5" /> // Show moon icon in light mode
      ) : (
        <FiSun className="w-5 h-5" /> // Show sun icon in dark mode
      )}
    </button>
  );
};

export default ThemeToggle;