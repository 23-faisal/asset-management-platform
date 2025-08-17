"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full"
    >
      {/* Sun Icon */}
      <span
        className={`absolute inset-0 flex items-center justify-center transform transition-all duration-300 ${
          isDark
            ? "opacity-100 rotate-[360deg] scale-100"
            : "opacity-0 rotate-0 scale-75"
        }`}
      >
        <Sun className="h-6 w-6 text-yellow-400" />
      </span>

      {/* Moon Icon */}
      <span
        className={`absolute inset-0 flex items-center  justify-center transform transition-all duration-300  ${
          isDark
            ? "opacity-0 rotate-0 scale-75"
            : "opacity-100 rotate-[360deg] scale-100"
        }`}
      >
        <Moon className="h-6 w-6 text-blue-500" />
      </span>
    </Button>
  );
};

export default ToggleTheme;
