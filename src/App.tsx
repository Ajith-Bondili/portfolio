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
  RecentTracksData,
} from "./types/indexs";
import { experiencesData, fallbackRecentTracks, personalInfo, projectsData } from "./data/info";
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

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const NEXT_WINDOW: Record<WindowKey, WindowKey> = {
  me: "music",
  music: "cli",
  cli: "projects",
  projects: "experience",
  experience: "coding",
  coding: "me",
};

const PREV_WINDOW: Record<WindowKey, WindowKey> = {
  me: "coding",
  coding: "experience",
  experience: "projects",
  projects: "cli",
  cli: "music",
  music: "me",
};

function stripHtml(raw: string) {
  return raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function isJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json");
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

  const [selectedWindow, setSelectedWindow] = useState<WindowKey>("me");
  const [expandWindow, setExpandWindow] = useState<ExpandKey>("");
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);

  const [codingView, setCodingView] = useState<"github" | "leetcode">("github");
  const [githubActivity, setGithubActivity] = useState<GitHubActivityData | null>(null);
  const [leetCode, setLeetCode] = useState<LeetCodeData | null>(null);
  const [musicPreviewIndex, setMusicPreviewIndex] = useState<number | null>(null);

  const [recentTracks, setRecentTracks] = useState<RecentTracksData | null>(fallbackRecentTracks);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [command, setCommand] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === "dark";
  const [booting, setBooting] = useState(true);
  const [visitorGreeting, setVisitorGreeting] = useState<string | undefined>(undefined);

  const slashCommands = useMemo(
    () => [
      "/help",
      "/theme",
      "/clear",
    ],
    [],
  );

  const cliSuggestions = useMemo(() => {
    const trimmed = command.trim().toLowerCase();
    if (!trimmed.startsWith("/")) return [];
    return slashCommands
      .filter((candidate) => candidate.toLowerCase().startsWith(trimmed))
      .slice(0, 6);
  }, [command, slashCommands]);

  const localCommands = useMemo(() => {
    const aboutSummary = personalInfo.aboutMe
      .slice(0, 2)
      .map((line) => stripHtml(line))
      .join(" ");
    const experienceSummary = experiencesData
      .slice(0, 3)
      .map((item) => item.title)
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
      contact: `${personalInfo.email} | github: ${personalInfo.socialLinks.github} | linkedin: ${personalInfo.socialLinks.linkedin} | x: ${personalInfo.socialLinks.x}`,
      help:
        "quick facts (type and enter):\n- about\n- experience\n- projects\n- skills\n- goals\n- funfact\n- contact\n\nslash:\n- /help\n- /theme\n- /clear\n\nanything else → i'll answer as me (chat).",
    } as const;
  }, []);

  const playablePreviewUrls = useMemo(
    () =>
      (recentTracks?.tracks || [])
        .map((track) => track.preview_url)
        .filter((url): url is string => Boolean(url)),
    [recentTracks],
  );

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
      } else {
        const githubError = githubResult.reason;
        if (!(githubError instanceof Error && githubError.message.includes("non-JSON"))) {
          console.error(githubError);
        }
      }

      if (leetResult.status === "fulfilled") {
        setLeetCode(leetResult.value);
      } else {
        const leetcodeError = leetResult.reason;
        if (!(leetcodeError instanceof Error && leetcodeError.message.includes("non-JSON"))) {
          console.error(leetcodeError);
        }
      }
    }

    void fetchCodingData();
  }, []);

  useEffect(() => {
    async function fetchRecentTracks() {
      try {
        const response = await fetch("/api/recent-tracks");
        if (!response.ok || !isJsonResponse(response)) return;
        const payload = (await response.json()) as RecentTracksData;
        setRecentTracks(payload);
      } catch (error) {
        console.error("recent tracks fetch failed", error);
      }
    }

    void fetchRecentTracks();
    const intervalId = window.setInterval(() => {
      void fetchRecentTracks();
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch("/api/visitor-location")
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setVisitorGreeting((data as { greeting?: string }).greeting || ""))
      .catch(() => setVisitorGreeting(""));
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
    if (selectedWindow === "music") return;

    setMusicPreviewIndex(null);
    const active = document.activeElement as HTMLElement | null;
    if (active?.dataset.musicPreviewIndex) {
      active.blur();
    }
  }, [selectedWindow]);

  useEffect(() => {
    if (playablePreviewUrls.length === 0) {
      setMusicPreviewIndex(null);
      return;
    }

    setMusicPreviewIndex((prev) => {
      if (prev === null) return prev;
      return prev >= playablePreviewUrls.length ? 0 : prev;
    });
  }, [playablePreviewUrls.length]);

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
        if (event.key === "ArrowRight") {
          setSelectedWindow(NEXT_WINDOW[selectedWindow]);
        } else {
          setSelectedWindow(PREV_WINDOW[selectedWindow]);
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
        if (event.key === "ArrowRight") {
          setSelectedWindow(NEXT_WINDOW[selectedWindow]);
        } else {
          setSelectedWindow(PREV_WINDOW[selectedWindow]);
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

      if (selectedWindow === "music") {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          if (playablePreviewUrls.length === 0) return;
          event.preventDefault();
          setMusicPreviewIndex((prev) => {
            if (prev === null || prev < 0 || prev >= playablePreviewUrls.length) {
              return event.key === "ArrowUp" ? playablePreviewUrls.length - 1 : 0;
            }

            return event.key === "ArrowDown"
              ? (prev + 1) % playablePreviewUrls.length
              : (prev - 1 + playablePreviewUrls.length) % playablePreviewUrls.length;
          });
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
  }, [expandWindow, selectedWindow, playablePreviewUrls.length]);

  useEffect(() => {
    if (selectedWindow === "cli" && !expandWindow) {
      inputRef.current?.focus();
    }
  }, [selectedWindow, expandWindow]);

  useEffect(() => {
    setSuggestionIndex((prev) => {
      if (cliSuggestions.length === 0) return 0;
      return Math.min(prev, cliSuggestions.length - 1);
    });
  }, [cliSuggestions.length]);

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
    const hasSlashSuggestions =
      command.trim().startsWith("/") && cliSuggestions.length > 0;

    if (event.key === "Tab" && hasSlashSuggestions) {
      event.preventDefault();
      setCommand(cliSuggestions[suggestionIndex] || cliSuggestions[0]);
      return;
    }

    if (event.key === "ArrowDown" && hasSlashSuggestions) {
      event.preventDefault();
      setSuggestionIndex((prev) => (prev + 1) % cliSuggestions.length);
      return;
    }

    if (event.key === "ArrowUp" && hasSlashSuggestions) {
      event.preventDefault();
      setSuggestionIndex((prev) => (prev - 1 + cliSuggestions.length) % cliSuggestions.length);
      return;
    }

    if (event.key !== "Enter") return;

    const input = command.trim();
    if (!input) return;

    const resolvedInput = hasSlashSuggestions
      ? (cliSuggestions[suggestionIndex] || cliSuggestions[0] || input)
      : input;

    const normalized = resolvedInput.toLowerCase();
    if (normalized === "/clear") {
      setCommand("");
      setSuggestionIndex(0);
      setIsAsking(false);
      setChatHistory([]);
      return;
    }

    setCommand("");
    setSuggestionIndex(0);
    const userMessage: ChatMessage = { role: "user", content: resolvedInput };

    if (normalized === "/theme") {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const cliReply = `switched to ${nextTheme} mode.`;
      setTheme(nextTheme);
      setChatHistory((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: cliReply },
      ]);
      return;
    }

    const localResponse =
      localCommands[normalized as keyof typeof localCommands] ||
      (normalized === "commands" || normalized === "/help" ? localCommands.help : null);

    if (localResponse) {
      setChatHistory((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: localResponse },
      ]);
      return;
    }

    if (normalized.startsWith("/")) {
      setChatHistory((prev) => [
        ...prev,
        userMessage,
        {
          role: "assistant",
          content: "unknown slash command. try /help, /theme, or /clear.",
        },
      ]);
      return;
    }

    setIsAsking(true);
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const messages = [...chatHistory, userMessage];
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

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: answer },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "something broke on my side. try again in a sec." },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className={`app-root theme-${theme}`}>
      <DitherBackground />

      <main className="app-content">
        <div className="workspace-shell">
          <div className="workspace-hint" aria-live="polite">
            {booting ? (
              <span>
                loading tty modules<span className="blink-dot">.</span>
              </span>
            ) : (
              <span>
                focus={selectedWindow}
                {selectedWindow === "coding" ? ` (${codingView})` : ""}
                {" · "}nav: ←/→ switch · ↑/↓ move · enter open · esc close · click focus
              </span>
            )}
          </div>
          <div className="portfolio-grid">
            <MeWindow
              selected={selectedWindow === "me"}
              expanded={false}
              className="layout-me"
              timeLabel={time.toLocaleTimeString()}
              personalInfo={personalInfo}
              visitorGreeting={visitorGreeting}
              onClick={() => setSelectedWindow("me")}
              onExpand={() => {
                setSelectedWindow("me");
                setExpandWindow("me");
              }}
            />

            <ExperienceWindow
              selected={selectedWindow === "experience"}
              expanded={false}
              className="layout-projects"
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
              className="layout-experience"
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
              className="layout-coding"
              view={codingView}
              githubData={githubActivity}
              leetCodeData={leetCode}
              onSetView={setCodingView}
              onClick={() => setSelectedWindow("coding")}
              onExpand={() => {
                setSelectedWindow("coding");
                setExpandWindow("coding");
              }}
            />

            <MusicMini
              selected={selectedWindow === "music"}
              className="layout-music"
              recentTracks={recentTracks}
              isPreviewPlaying={isPreviewPlaying}
              currentPreviewUrl={currentPreviewUrl}
              focusedPreviewIndex={selectedWindow === "music" ? musicPreviewIndex : null}
              onClick={() => setSelectedWindow("music")}
              onPreviewFocus={setMusicPreviewIndex}
              onTogglePreview={handlePreviewToggle}
            />

            <CliWindow
              selected={selectedWindow === "cli"}
              className="layout-cli"
              command={command}
              messages={chatHistory}
              isLoading={isAsking}
              suggestions={cliSuggestions}
              suggestionIndex={suggestionIndex}
              inputRef={inputRef}
              onClick={() => setSelectedWindow("cli")}
              onCommandChange={(value) => {
                setCommand(value);
                setSuggestionIndex(0);
              }}
              onSuggestionPick={(value) => {
                setCommand(value);
                setSuggestionIndex(0);
                inputRef.current?.focus();
              }}
              onCommandKeyDown={(event) => {
                void handleCommandKeyDown(event);
              }}
            />
          </div>
        </div>
      </main>

      {expandWindow ? (
        <div className="overlay-backdrop" onClick={() => setExpandWindow("")}> 
          <div className="overlay-window" onClick={(event) => event.stopPropagation()}>
            {expandWindow === "me" ? (
              <MeWindow
                selected={selectedWindow === "me"}
                expanded
                timeLabel={time.toLocaleTimeString()}
                personalInfo={personalInfo}
                visitorGreeting={visitorGreeting}
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
