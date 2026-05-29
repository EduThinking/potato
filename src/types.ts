export interface Potato {
  id: string;
  name: string;
  scientificName: string;
  type: string; // 'classic' | 'neighbor' | 'wild' | 'special'
  image: string;
  unlocked: boolean;
  description: string;
  height: string;
  weight: string;
  favorite: string;
  unlockedHint: string;
}

export interface DiaryEntry {
  id: string;
  date: string; // e.g. "10월 24일"
  title: string;
  image?: string;
  icon?: string; // e.g. "eco" or "pets"
  content: string[];
  likes: number;
  likedByUser?: boolean;
}

export interface GoodsItem {
  id: string;
  title: string;
  category: string; // "폰 배경화면" | "굿노트 스티커" | "워치 페이스"
  image: string;
  price?: string;
  collected: boolean;
  description: string;
}
