import { HeadphoneOff, Pause, Play } from "lucide-react";
import type { NowPlayingData } from "../../types/indexs";
import WindowShell from "../windows/WindowShell";

interface MusicMiniProps {
  selected: boolean;
  className?: string;
  nowPlaying: NowPlayingData | null;
  isPreviewPlaying: boolean;
  onClick: () => void;
  onTogglePreview: (previewUrl: string | null) => void;
}

export default function MusicMini({
  selected,
  className,
  nowPlaying,
  isPreviewPlaying,
  onClick,
  onTogglePreview,
}: MusicMiniProps) {
  const hasTrack = Boolean(nowPlaying?.item);
  const item = nowPlaying?.item;

  return (
    <WindowShell title="music" selected={selected} onClick={onClick} className={className}>
      <div className="music-mini-shell">
        {hasTrack && item ? (
          <>
            <div className="music-meta">
              {item.album_image ? (
                <img src={item.album_image} alt={item.name} className="music-cover" />
              ) : (
                <div className="music-cover music-cover-placeholder" aria-hidden>
                  ♫
                </div>
              )}

              <div className="music-lines">
                <a
                  href={item.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="minimal-link"
                >
                  {item.name}
                </a>
                <p className="muted-text">{item.artists.join(", ")}</p>
              </div>
            </div>

            {item.preview_url ? (
              <button
                type="button"
                className="preview-btn"
                onClick={() => onTogglePreview(item.preview_url)}
              >
                {isPreviewPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPreviewPlaying ? "pause preview" : "play preview"}
              </button>
            ) : (
              <p className="muted-text">preview unavailable</p>
            )}
          </>
        ) : (
          <div className="music-empty">
            <HeadphoneOff className="h-5 w-5" />
            <p className="muted-text">nothing playing right now</p>
          </div>
        )}
      </div>
    </WindowShell>
  );
}
