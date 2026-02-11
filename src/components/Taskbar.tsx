import { Github, Linkedin, Moon, Sun } from "lucide-react";
import Tooltip from "./Tooltip";
import { personalInfo } from "../data/info";

interface TaskbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Taskbar({ theme, onToggleTheme }: TaskbarProps) {
  const isDark = theme === "dark";

  return (
    <footer className="taskbar">
      <Tooltip text="GitHub">
        <a
          href={personalInfo.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="taskbar-icon"
          aria-label="Open GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </Tooltip>

      <Tooltip text="LinkedIn">
        <a
          href={personalInfo.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="taskbar-icon"
          aria-label="Open LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Tooltip>

      <button
        type="button"
        className="taskbar-icon"
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </footer>
  );
}

export default Taskbar;
