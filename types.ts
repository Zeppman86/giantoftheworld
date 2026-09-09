
export interface Building {
  id: string;
  name: string;
  location: string;
  countryCode: string | string[]; // ISO 3166-1 alpha-2
  height: number;
  yearBuilt: number;
  yearRecordEnded?: number | null;
  yearDestroyed?: number;
  heightHistory?: { year: number; height: number }[];
  activeUntil: number;
  category: 'Modern' | 'Ancient' | 'Gothic' | 'Industrial' | 'Statue' | 'Engineering' | 'Mast';
  description: string;
  funFact: string; 
  imageUrl: string;
  imageSource?: 'manual' | 'auto' | 'system';
  forceImageUpdate?: boolean;
  isFormerRecordHolder?: boolean;
}

export interface YearData {
  year: number;
  tallest: Building[];
}