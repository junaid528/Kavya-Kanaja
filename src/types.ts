export interface Meaning {
  word: string;
  meaning: string;
  example: string;
}

export interface Poem {
  id: string;
  title: string;
  poetId: string;
  kannadaTitle: string;
  content: string;
  meanings: Record<string, Meaning>;
  audioUrl?: string;
  category: string;
  publishedDate: string;
}

export interface Poet {
  id: string;
  name: string;
  kannadaName: string;
  bio: string;
  kannadaBio: string;
  notableWorks: string[];
  imageUrl: string;
  period: string;
}

export interface UserProfile {
  userId: string;
  name?: string;
  email: string;
  theme: ThemeMode;
  fontSize: number;
  readingStreak: number;
  dailyGoal: number;
  lastReadPoemId?: string;
  lastReadDate?: string;
  totalReadCount: number;
}

export interface PoemNote {
  poemId: string;
  content: string;
  updatedAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'sepia';
