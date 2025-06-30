import { useEffect, useState } from "react";

export default function useDarkMode(defaultValue = true) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("dark-mode");
    return stored !== null ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(isDark ? "light-mode" : "dark-mode");
    root.classList.add(isDark ? "dark-mode" : "light-mode");

    localStorage.setItem("dark-mode", JSON.stringify(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
}
