
export interface Building {
  id: string;
  name: string;
  location: string;
  countryCode: string; // ISO 3166-1 alpha-2
  height: number;
  yearBuilt: number;
  yearRecordEnded?: number | null;
  yearDestroyed?: number;
  activeUntil: number;
  category: 'Modern' | 'Ancient' | 'Gothic' | 'Industrial' | 'Future' | 'Statue' | 'Engineering' | 'Mast';
  description: string;
  funFact: string; 
  imageUrl: string;
  isFormerRecordHolder?: boolean;
}

export interface YearData {
  year: number;
  tallest: Building[];
}
