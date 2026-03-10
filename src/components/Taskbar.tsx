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

      <Tooltip text="X">
        <a
          href={personalInfo.socialLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          className="taskbar-icon"
          aria-label="Open X"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M18.901 1.153h3.68l-8.038 9.187L24 22.847h-7.405l-5.8-7.584-6.638 7.584H.476l8.598-9.826L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.494h2.04L6.486 3.238H4.298l13.313 17.409Z" />
          </svg>
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
