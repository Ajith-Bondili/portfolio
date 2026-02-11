import type { ReactNode } from "react";

interface WindowShellProps {
  title: string;
  selected: boolean;
  onClick?: () => void;
  onExpand?: () => void;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function WindowShell({
  title,
  selected,
  onClick,
  onExpand,
  onClose,
  children,
  className = "",
  bodyClassName = "",
}: WindowShellProps) {
  return (
    <section
      className={`terminal-window ${selected ? "terminal-window-selected" : ""} ${className}`}
      onClick={onClick}
      aria-label={title}
    >
      <header className="terminal-header">
        <p className="terminal-title">{title} - zsh</p>
        <div className="terminal-dots">
          {onClose ? (
            <button
              type="button"
              className="dot dot-red"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              aria-label={`Close ${title}`}
            />
          ) : (
            <span className="dot dot-red" />
          )}
          {onClose ? (
            <button
              type="button"
              className="dot dot-yellow"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              aria-label={`Minimize ${title}`}
            />
          ) : (
            <span className="dot dot-yellow" />
          )}
          {onExpand ? (
            <button
              type="button"
              className="dot dot-green"
              onClick={(event) => {
                event.stopPropagation();
                onExpand();
              }}
              aria-label={`Expand ${title}`}
            />
          ) : (
            <span className="dot dot-green" />
          )}
        </div>
      </header>
      <div className={`terminal-body ${bodyClassName}`}>{children}</div>
    </section>
  );
}
