import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import AnimatedEllipsis from "../AnimatedEllipsis";
import WindowShell from "./WindowShell";

interface CliMessage {
  role: "user" | "assistant";
  content: string;
}

interface CliWindowProps {
  selected: boolean;
  className?: string;
  command: string;
  messages: CliMessage[];
  isLoading: boolean;
  suggestions: string[];
  suggestionIndex: number;
  inputRef: RefObject<HTMLInputElement | null>;
  onClick: () => void;
  onCommandChange: (value: string) => void;
  onSuggestionPick: (value: string) => void;
  onCommandKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function CliWindow({
  selected,
  className,
  command,
  messages,
  isLoading,
  suggestions,
  suggestionIndex,
  inputRef,
  onClick,
  onCommandChange,
  onSuggestionPick,
  onCommandKeyDown,
}: CliWindowProps) {
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isLoading]);

  return (
    <WindowShell title="cli" selected={selected} onClick={onClick} className={className}>
      <div className="cli-shell">
        <div className="cli-transcript" role="log" aria-live="polite" aria-label="CLI chat transcript">
          {messages.length === 0 ? (
            <p className="cli-empty-state">
              try: about, experience, projects, skills, goals, contact, /goto coding
            </p>
          ) : null}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
              className={`cli-message cli-message-${message.role}`}
            >
              <p className="cli-message-label">{message.role === "user" ? "you" : "ajith"}</p>
              <p className="cli-message-text">{message.content}</p>
            </div>
          ))}

          {isLoading ? (
            <div className="cli-message cli-message-assistant cli-thinking">
              <p className="cli-message-label">ajith</p>
              <p className="cli-message-text">
                thinking<AnimatedEllipsis />
              </p>
            </div>
          ) : null}

          <div ref={transcriptEndRef} aria-hidden />
        </div>

        <div className="cli-input-shell">
          <label className="cli-input-row" htmlFor="cli-input">
            <span className="cli-prefix">❯</span>
            <input
              ref={inputRef}
              id="cli-input"
              type="text"
              value={command}
              onChange={(event) => onCommandChange(event.target.value)}
              onKeyDown={onCommandKeyDown}
              placeholder="ask me anything"
              className="cli-input"
              autoComplete="off"
            />
          </label>

          {suggestions.length > 0 ? (
            <div className="cli-suggestions" aria-label="Command suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`cli-suggestion ${index === suggestionIndex ? "cli-suggestion-active" : ""}`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onSuggestionPick(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
              <p className="cli-suggestion-hint">tab complete · ↑/↓ cycle</p>
            </div>
          ) : null}
        </div>
      </div>
    </WindowShell>
  );
}
