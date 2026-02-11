import type { KeyboardEvent, RefObject } from "react";
import AnimatedEllipsis from "../AnimatedEllipsis";
import WindowShell from "./WindowShell";

interface CliWindowProps {
  selected: boolean;
  className?: string;
  command: string;
  lastCommand: string;
  response: string;
  isLoading: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onClick: () => void;
  onCommandChange: (value: string) => void;
  onCommandKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export default function CliWindow({
  selected,
  className,
  command,
  lastCommand,
  response,
  isLoading,
  inputRef,
  onClick,
  onCommandChange,
  onCommandKeyDown,
}: CliWindowProps) {
  return (
    <WindowShell title="cli" selected={selected} onClick={onClick} className={className}>
      <div className="cli-shell">
        {lastCommand ? (
          <p className="cli-line">
            <span className="cli-prefix">❯</span>
            {lastCommand}
          </p>
        ) : (
          <p className="muted-text">
            try: about, experience, projects, skills, goals, contact, /goto coding
          </p>
        )}

        {isLoading ? (
          <p className="cli-line muted-text">
            thinking<AnimatedEllipsis />
          </p>
        ) : response ? (
          <p className="cli-response">{response}</p>
        ) : null}

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
      </div>
    </WindowShell>
  );
}
