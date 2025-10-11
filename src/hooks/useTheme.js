import { useEffect, useState } from "react";

const themFromLocal = () => {
  return localStorage.getItem("theme") || "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState(themFromLocal());

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, changeTheme };
};
