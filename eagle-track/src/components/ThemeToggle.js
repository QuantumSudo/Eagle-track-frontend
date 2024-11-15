import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
