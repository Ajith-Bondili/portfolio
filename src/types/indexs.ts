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

export interface ListeningCard {
  kind: "track" | "episode" | "artist" | "show";
  title: string;
  subtitle: string;
  meta?: string;
  image?: string;
  url?: string;
  preview_url?: string | null;
}

export interface ListeningSnapshotData {
  cached?: boolean;
  warning?: string;
  music: {
    lastListened: ListeningCard | null;
    favorite: ListeningCard | null;
    latest: ListeningCard | null;
  };
  podcasts: {
    lastListened: ListeningCard | null;
    favorite: ListeningCard | null;
    latest: ListeningCard | null;
  };
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

export interface RecentTracksData {
  cached?: boolean;
  warning?: string;
  favorite_artist?: {
    name: string;
    image: string;
    url: string;
  } | null;
  tracks: Array<{
    id: string;
    name: string;
    artists: string[];
    album: string;
    album_image: string;
    spotify_url: string;
    preview_url: string | null;
    played_at?: string | null;
  }>;
}

export interface LeetCodeData {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
  acceptanceRate?: number;
  ranking?: number;
  contributionPoints?: number;
  totalQuestions?: number;
  totalEasy?: number;
  totalMedium?: number;
  totalHard?: number;
  last7Submissions?: number;
  last14Submissions?: number;
  activeDays14?: number;
  currentSubmissionStreak?: number;
  bestSubmissionStreak?: number;
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
  activeDays?: number;
  avgPerActiveDay?: number;
  last7Total?: number;
  last30Total?: number;
  bestDayCount?: number;
  bestDayDate?: string | null;
  maxLevelStreak?: number;
  days: GitHubContributionDay[];
  cached?: boolean;
  warning?: string;
  fetchedAt?: string;
}
