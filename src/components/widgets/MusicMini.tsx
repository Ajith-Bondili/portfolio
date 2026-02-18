import { useEffect, useRef } from "react";
import { HeadphoneOff, Pause, Play } from "lucide-react";
import type { RecentTracksData } from "../../types/indexs";
import WindowShell from "../windows/WindowShell";

interface MusicMiniProps {
  selected: boolean;
  className?: string;
  recentTracks: RecentTracksData | null;
  isPreviewPlaying: boolean;
  currentPreviewUrl: string | null;
  focusedPreviewIndex: number | null;
  onClick: () => void;
  onPreviewFocus: (index: number) => void;
  onTogglePreview: (previewUrl: string | null) => void;
}

export default function MusicMini({
  selected,
  className,
  recentTracks,
  isPreviewPlaying,
  currentPreviewUrl,
  focusedPreviewIndex,
  onClick,
  onPreviewFocus,
  onTogglePreview,
}: MusicMiniProps) {
  const tracks = recentTracks?.tracks || [];
  const previewButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const playableCount = tracks.filter((track) => Boolean(track.preview_url)).length;

  useEffect(() => {
    previewButtonRefs.current = previewButtonRefs.current.slice(0, playableCount);
  }, [playableCount]);

  useEffect(() => {
    if (
      focusedPreviewIndex === null ||
      focusedPreviewIndex < 0 ||
      focusedPreviewIndex >= playableCount
    ) {
      return;
    }

    const target = previewButtonRefs.current[focusedPreviewIndex];
    if (target && document.activeElement !== target) {
      target.focus();
    }
  }, [focusedPreviewIndex, playableCount]);

  let previewButtonIndex = -1;

  return (
    <WindowShell title="music" selected={selected} onClick={onClick} className={className}>
      <div className="music-mini-shell">
        {tracks.length > 0 ? (
          <>
            <p className="music-list-label">last 3 tracks</p>
            <div className="music-list" aria-label="Recent songs">
              {tracks.map((track) => {
                const currentPreviewIndex = track.preview_url ? (previewButtonIndex += 1) : -1;

                return (
                  <article className="music-row" key={track.id}>
                    {track.album_image ? (
                      track.preview_url ? (
                        <button
                          type="button"
                          className="music-cover-button"
                          onClick={() => onTogglePreview(track.preview_url)}
                          aria-label={`Play preview for ${track.name}`}
                        >
                          <img src={track.album_image} alt={track.name} className="music-cover" />
                        </button>
                      ) : (
                        <img src={track.album_image} alt={track.name} className="music-cover" />
                      )
                    ) : (
                      <div className="music-cover music-cover-placeholder" aria-hidden>
                        ♫
                      </div>
                    )}

                    <div className="music-lines">
                      <a
                        href={track.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="minimal-link"
                      >
                        {track.name}
                      </a>
                    </div>

                    {track.preview_url ? (
                      <button
                        type="button"
                        className={`music-preview-inline ${
                          focusedPreviewIndex === currentPreviewIndex
                            ? "music-preview-inline-focused"
                            : ""
                        }`}
                        onClick={() => onTogglePreview(track.preview_url)}
                        onFocus={() => onPreviewFocus(currentPreviewIndex)}
                        ref={(button) => {
                          previewButtonRefs.current[currentPreviewIndex] = button;
                        }}
                        data-music-preview-index={currentPreviewIndex}
                        aria-label={
                          isPreviewPlaying && currentPreviewUrl === track.preview_url
                            ? "Pause preview"
                            : "Play preview"
                        }
                      >
                        {isPreviewPlaying && currentPreviewUrl === track.preview_url ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                    ) : null}
                  </article>
                );
              })}
            </div>
            {recentTracks?.favorite_artist ? (
              <article className="music-favorite-row">
                <p className="music-list-label">favorite artist</p>
                <div className="music-meta">
                  {recentTracks.favorite_artist.image ? (
                    <img
                      src={recentTracks.favorite_artist.image}
                      alt={recentTracks.favorite_artist.name}
                      className="music-cover"
                    />
                  ) : null}
                  <div className="music-lines">
                    <a
                      href={recentTracks.favorite_artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="minimal-link"
                    >
                      {recentTracks.favorite_artist.name}
                    </a>
                  </div>
                </div>
              </article>
            ) : null}
          </>
        ) : (
          <div className="music-empty">
            <HeadphoneOff className="h-5 w-5" />
            <p className="muted-text">no recent songs found</p>
          </div>
        )}
      </div>
    </WindowShell>
  );
}
