export interface NowPlayingData {
  is_playing: boolean;
  recently_played?: boolean;
  played_at?: string;
  cached?: boolean;
  warning?: string;
  item: NowPlayingItem | null;
}

interface NowPlayingItem {
  album: string;
  album_image: string;
  artists: string[];
  name: string;
  spotify_url: string;
  preview_url: string | null;
}

export interface TopTracksData {
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  artists: string[];
  album: string;
  album_image: string;
  spotify_url: string;
  preview_url: string | null;
}

export interface LeetCodeData {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  cached?: boolean;
  warning?: string;
  submissionCalendar: {
    [timestamp: string]: number;
  };
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubActivityData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  days: GitHubContributionDay[];
  cached?: boolean;
  warning?: string;
  fetchedAt?: string;
}
