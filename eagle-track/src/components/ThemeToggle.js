import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
    >
      {theme === 'light' ? (
        <FaMoon className="text-xl text-gray-800" />
      ) : (
        <FaSun className="text-xl text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;