import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type {
  GitHubActivityData,
  LeetCodeData,
  NowPlayingData,
} from "./types/indexs";
import { asciiList, experiencesData, personalInfo, projectsData } from "./data/info";
import DitherBackground from "./components/effects/DitherBackground";
import MeWindow from "./components/windows/MeWindow";
import ExperienceWindow from "./components/windows/ExperienceWindow";
import ProjectsWindow from "./components/windows/ProjectsWindow";
import CodingWindow from "./components/windows/CodingWindow";
import CliWindow from "./components/windows/CliWindow";
import MusicMini from "./components/widgets/MusicMini";
import Taskbar from "./components/Taskbar";

type WindowKey = "me" | "experience" | "projects" | "coding" | "music" | "cli";
type ExpandKey = "" | "me" | "experience" | "projects" | "coding";
type DataStatus = "loading" | "live" | "cached" | "degraded";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const WINDOW_ORDER: WindowKey[] = [
  "me",
  "experience",
  "projects",
  "coding",
  "music",
  "cli",
];

function stripHtml(raw: string) {
  return raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function isJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json");
}

function inferStatus(
  payload: { cached?: boolean; warning?: string } | null,
  fallback: DataStatus = "degraded",
): DataStatus {
  if (!payload) return fallback;
  if (payload.warning) return "degraded";
  if (payload.cached) return "cached";
  return "live";
}

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";

    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [time, setTime] = useState(new Date());
  const [selectedAscii] = useState(
    asciiList[Math.floor(Math.random() * Math.max(1, asciiList.length))] || "",
  );

  const [selectedWindow, setSelectedWindow] = useState<WindowKey>("me");
  const [expandWindow, setExpandWindow] = useState<ExpandKey>("");
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  const [codingView, setCodingView] = useState<"github" | "leetcode">("github");
  const [githubActivity, setGithubActivity] = useState<GitHubActivityData | null>(null);
  const [leetCode, setLeetCode] = useState<LeetCodeData | null>(null);
  const [githubStatus, setGithubStatus] = useState<DataStatus>("loading");
  const [leetcodeStatus, setLeetcodeStatus] = useState<DataStatus>("loading");

  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === "dark";
  const [booting, setBooting] = useState(true);

  const localCommands = useMemo(() => {
    const aboutSummary = personalInfo.aboutMe
      .slice(0, 2)
      .map((line) => stripHtml(line))
      .join(" ");
    const experienceSummary = experiencesData
      .slice(0, 3)
      .map((item) => `${item.title} (${item.date})`)
      .join(" | ");
    const projectsSummary = projectsData
      .slice(0, 3)
      .map((item) => item.title)
      .join(" | ");

    return {
      about: aboutSummary,
      experience: experienceSummary,
      projects: projectsSummary,
      skills:
        "python, typescript, java, pytorch, react, node.js, rails, kafka, postgres, docker, and ai/llm systems.",
      goals:
        "build thoughtful ai products, level up as an engineer, and ship impactful systems with clean ux.",
      funfact:
        "i enjoy blending minimal design with technical depth and keyboard-first experiences.",
      contact: `${personalInfo.email} | github: ${personalInfo.socialLinks.github} | linkedin: ${personalInfo.socialLinks.linkedin}`,
      help:
        "available commands: about, experience, projects, skills, goals, funfact, contact | slash: /goto <window>, /theme, /clear",
    } as const;
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setBooting(false);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");
      if (saved !== "dark" && saved !== "light") {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    async function fetchCodingData() {
      setGithubStatus("loading");
      setLeetcodeStatus("loading");

      const githubUrl = `/api/github-activity?username=${encodeURIComponent(
        personalInfo.githubUsername,
      )}`;
      const leetUrl = `/api/leetcode?username=${encodeURIComponent(
        personalInfo.leetcodeUsername,
      )}`;

      const [githubResult, leetResult] = await Promise.allSettled([
        fetch(githubUrl).then(async (res) => {
          if (!isJsonResponse(res)) {
            throw new Error("GitHub activity endpoint returned non-JSON data.");
          }
          const payload = (await res.json()) as GitHubActivityData;
          if (!res.ok) {
            throw new Error((payload as { message?: string }).message || "GitHub activity fetch failed");
          }
          return payload;
        }),
        fetch(leetUrl).then(async (res) => {
          if (!isJsonResponse(res)) {
            throw new Error("LeetCode endpoint returned non-JSON data.");
          }
          const payload = (await res.json()) as LeetCodeData;
          if (!res.ok) {
            throw new Error((payload as { message?: string }).message || "LeetCode fetch failed");
          }
          return payload;
        }),
      ]);

      if (githubResult.status === "fulfilled") {
        setGithubActivity(githubResult.value);
        setGithubStatus(inferStatus(githubResult.value, "live"));
      } else {
        const githubError = githubResult.reason;
        if (!(githubError instanceof Error && githubError.message.includes("non-JSON"))) {
          console.error(githubError);
        }
        setGithubStatus("degraded");
      }

      if (leetResult.status === "fulfilled") {
        setLeetCode(leetResult.value);
        setLeetcodeStatus(inferStatus(leetResult.value, "live"));
      } else {
        const leetcodeError = leetResult.reason;
        if (!(leetcodeError instanceof Error && leetcodeError.message.includes("non-JSON"))) {
          console.error(leetcodeError);
        }
        setLeetcodeStatus("degraded");
      }
    }

    void fetchCodingData();
  }, []);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await fetch("/api/now-playing");
        if (!response.ok || !isJsonResponse(response)) return;
        const payload = (await response.json()) as NowPlayingData;
        setNowPlaying(payload);
      } catch (error) {
        console.error("now playing fetch failed", error);
      }
    }

    void fetchNowPlaying();
    const intervalId = window.setInterval(() => {
      void fetchNowPlaying();
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (
        selectedWindow === "cli" &&
        isTypingTarget &&
        (event.key === "ArrowLeft" || event.key === "ArrowRight")
      ) {
        event.preventDefault();
        const currentIndex = WINDOW_ORDER.indexOf(selectedWindow);

        if (event.key === "ArrowRight") {
          setSelectedWindow(WINDOW_ORDER[(currentIndex + 1) % WINDOW_ORDER.length]);
        } else {
          setSelectedWindow(
            WINDOW_ORDER[(currentIndex - 1 + WINDOW_ORDER.length) % WINDOW_ORDER.length],
          );
        }

        inputRef.current?.blur();
        return;
      }

      if (event.key === "Escape" && expandWindow) {
        setExpandWindow("");
        return;
      }

      if (expandWindow) {
        if (selectedWindow === "coding") {
          if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab") {
            event.preventDefault();
            setCodingView((prev) => (prev === "github" ? "leetcode" : "github"));
          }
        }

        if (selectedWindow === "experience") {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setExperienceIndex((prev) => (prev - 1 + experiencesData.length) % experiencesData.length);
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setExperienceIndex((prev) => (prev + 1) % experiencesData.length);
          }
        }

        if (selectedWindow === "projects") {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setProjectIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setProjectIndex((prev) => (prev + 1) % projectsData.length);
          }
        }

        return;
      }

      if (isTypingTarget && selectedWindow === "cli") {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const currentIndex = WINDOW_ORDER.indexOf(selectedWindow);

        if (event.key === "ArrowRight") {
          setSelectedWindow(WINDOW_ORDER[(currentIndex + 1) % WINDOW_ORDER.length]);
        } else {
          setSelectedWindow(
            WINDOW_ORDER[(currentIndex - 1 + WINDOW_ORDER.length) % WINDOW_ORDER.length],
          );
        }
      }

      if (selectedWindow === "experience") {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setExperienceIndex((prev) => (prev - 1 + experiencesData.length) % experiencesData.length);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setExperienceIndex((prev) => (prev + 1) % experiencesData.length);
        }
      }

      if (selectedWindow === "projects") {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setProjectIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setProjectIndex((prev) => (prev + 1) % projectsData.length);
        }
      }

      if (selectedWindow === "coding") {
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab") {
          event.preventDefault();
          setCodingView((prev) => (prev === "github" ? "leetcode" : "github"));
        }
      }

      if (event.key === "Enter") {
        if (selectedWindow === "cli") {
          inputRef.current?.focus();
          return;
        }

        if (selectedWindow === "me" || selectedWindow === "experience" || selectedWindow === "projects" || selectedWindow === "coding") {
          setExpandWindow(selectedWindow);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandWindow, selectedWindow]);

  useEffect(() => {
    if (selectedWindow === "cli" && !expandWindow) {
      inputRef.current?.focus();
    }
  }, [selectedWindow, expandWindow]);

  const handlePreviewToggle = (previewUrl: string | null) => {
    if (!previewUrl) return;

    const currentAudio = audioRef.current;
    if (currentAudio && currentPreviewUrl === previewUrl && !currentAudio.paused) {
      currentAudio.pause();
      setIsPreviewPlaying(false);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const nextAudio = new Audio(previewUrl);
    audioRef.current = nextAudio;
    setCurrentPreviewUrl(previewUrl);

    nextAudio
      .play()
      .then(() => setIsPreviewPlaying(true))
      .catch((error) => {
        console.error("audio preview failed", error);
        setIsPreviewPlaying(false);
      });

    nextAudio.onended = () => {
      setIsPreviewPlaying(false);
      setCurrentPreviewUrl(null);
    };
  };

  const handleCommandKeyDown = async (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    const input = command.trim();
    if (!input) return;

    const normalized = input.toLowerCase();
    if (normalized === "/clear") {
      setCommand("");
      setLastCommand("");
      setResponse("");
      setChatHistory([]);
      return;
    }

    setLastCommand(input);
    setCommand("");

    if (normalized === "/theme") {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      setResponse(`switched to ${nextTheme} mode.`);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: `switched to ${nextTheme} mode.` },
      ]);
      return;
    }

    const gotoMatch = normalized.match(
      /^\/?(?:goto|switch)\s+(me|experience|projects|coding|music|cli)$/,
    );
    if (gotoMatch) {
      const target = gotoMatch[1] as WindowKey;
      setSelectedWindow(target);
      setExpandWindow("");
      const cliReply = `focused ${target}.`;
      setResponse(cliReply);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: cliReply },
      ]);
      return;
    }

    const localResponse =
      localCommands[normalized as keyof typeof localCommands] ||
      (normalized === "commands" || normalized === "/help" ? localCommands.help : null);

    if (localResponse) {
      setResponse(localResponse);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: localResponse },
      ]);
      return;
    }

    setIsAsking(true);
    setResponse("");

    try {
      const messages = [...chatHistory, { role: "user" as const, content: input }];
      const answerResponse = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!answerResponse.ok) {
        throw new Error(`AI request failed (${answerResponse.status})`);
      }

      const payload = (await answerResponse.json()) as { answer?: string };
      const answer = payload.answer || "sorry, i couldn't answer that right now.";

      setResponse(answer);
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      console.error(error);
      setResponse("something broke on my side. try again in a sec.");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <DitherBackground />

      <main className="app-content">
        <div className="workspace-hint" aria-live="polite">
          {booting ? (
            <span>
              loading tty modules<span className="blink-dot">.</span>
            </span>
          ) : (
            <span>
              active: {selectedWindow}
              {selectedWindow === "coding" ? ` (${codingView})` : ""}
              {" · "}←/→ switch · ↑/↓ navigate · enter expand · esc close · 🖱 click open
            </span>
          )}
        </div>
        <div className="portfolio-grid">
          <MeWindow
            selected={selectedWindow === "me"}
            expanded={false}
            className="col-span-2 lg:col-span-2"
            asciiArt={selectedAscii}
            timeLabel={time.toLocaleTimeString()}
            personalInfo={personalInfo}
            onClick={() => setSelectedWindow("me")}
            onExpand={() => {
              setSelectedWindow("me");
              setExpandWindow("me");
            }}
          />

          <ExperienceWindow
            selected={selectedWindow === "experience"}
            expanded={false}
            className="col-span-2 lg:col-span-1"
            experiences={experiencesData}
            activeIndex={experienceIndex}
            onSelectIndex={(index) => setExperienceIndex(index)}
            onOpenItem={(index) => {
              setExperienceIndex(index);
              setSelectedWindow("experience");
              setExpandWindow("experience");
            }}
            onClick={() => setSelectedWindow("experience")}
            onExpand={() => {
              setSelectedWindow("experience");
              setExpandWindow("experience");
            }}
          />

          <ProjectsWindow
            selected={selectedWindow === "projects"}
            expanded={false}
            className="col-span-2 lg:col-span-1"
            projects={projectsData}
            activeIndex={projectIndex}
            onSelectIndex={(index) => setProjectIndex(index)}
            onOpenItem={(index) => {
              setProjectIndex(index);
              setSelectedWindow("projects");
              setExpandWindow("projects");
            }}
            onClick={() => setSelectedWindow("projects")}
            onExpand={() => {
              setSelectedWindow("projects");
              setExpandWindow("projects");
            }}
          />

          <CodingWindow
            selected={selectedWindow === "coding"}
            expanded={false}
            isDark={isDark}
            className="col-span-2 lg:col-span-2"
            view={codingView}
            githubData={githubActivity}
            leetCodeData={leetCode}
            githubStatus={githubStatus}
            leetcodeStatus={leetcodeStatus}
            onSetView={setCodingView}
            onClick={() => setSelectedWindow("coding")}
            onExpand={() => {
              setSelectedWindow("coding");
              setExpandWindow("coding");
            }}
          />

          <MusicMini
            selected={selectedWindow === "music"}
            className="col-span-2 lg:col-span-1"
            nowPlaying={nowPlaying}
            isPreviewPlaying={isPreviewPlaying}
            onClick={() => setSelectedWindow("music")}
            onTogglePreview={handlePreviewToggle}
          />

          <CliWindow
            selected={selectedWindow === "cli"}
            className="col-span-2 lg:col-span-1"
            command={command}
            lastCommand={lastCommand}
            response={response}
            isLoading={isAsking}
            inputRef={inputRef}
            onClick={() => setSelectedWindow("cli")}
            onCommandChange={setCommand}
            onCommandKeyDown={(event) => {
              void handleCommandKeyDown(event);
            }}
          />
        </div>
      </main>

      {expandWindow ? (
        <div className="overlay-backdrop" onClick={() => setExpandWindow("")}> 
          <div className="overlay-window" onClick={(event) => event.stopPropagation()}>
            {expandWindow === "me" ? (
              <MeWindow
                selected={selectedWindow === "me"}
                expanded
                asciiArt={selectedAscii}
                timeLabel={time.toLocaleTimeString()}
                personalInfo={personalInfo}
                onClick={() => setSelectedWindow("me")}
                onExpand={() => undefined}
                onClose={() => setExpandWindow("")}
              />
            ) : null}

            {expandWindow === "experience" ? (
              <ExperienceWindow
                selected={selectedWindow === "experience"}
                expanded
                experiences={experiencesData}
                activeIndex={experienceIndex}
                onSelectIndex={(index) => setExperienceIndex(index)}
                onClick={() => setSelectedWindow("experience")}
                onExpand={() => undefined}
                onClose={() => setExpandWindow("")}
              />
            ) : null}

            {expandWindow === "projects" ? (
              <ProjectsWindow
                selected={selectedWindow === "projects"}
                expanded
                projects={projectsData}
                activeIndex={projectIndex}
                onSelectIndex={(index) => setProjectIndex(index)}
                onClick={() => setSelectedWindow("projects")}
                onExpand={() => undefined}
                onClose={() => setExpandWindow("")}
              />
            ) : null}

            {expandWindow === "coding" ? (
              <CodingWindow
                selected={selectedWindow === "coding"}
                expanded
                isDark={isDark}
                view={codingView}
                githubData={githubActivity}
                leetCodeData={leetCode}
                githubStatus={githubStatus}
                leetcodeStatus={leetcodeStatus}
                onSetView={setCodingView}
                onClick={() => setSelectedWindow("coding")}
                onExpand={() => undefined}
                onClose={() => setExpandWindow("")}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <Taskbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />
    </div>
  );
}

export default App;
