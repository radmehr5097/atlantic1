export interface Product {
  id: string;
  name: string;
  category: 'rejuvenator' | 'skin' | 'hair' | 'perfume' | 'pack';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  price: string;
  image: string;
  isAtlanticExclusive: boolean;
  ingredients: string[];
  modernSci: string;
  traditionalSci: string;
  islamicSci: string;
  usage: string;
  volume?: string;
}

export interface Perfume {
  id: string;
  name: string;
  cosmicProperties: string[];
  ingredientsBase: string[];
  exclusiveEssence: string;
  usage: string;
  startDay: string;
  volume: string;
  price: string;
  image: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  diseaseInfo: string;
  treatmentMethod: string;
  contents: string[];
  consultationSessions: number;
  price: string;
  image: string;
}

export interface ConsultationService {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  userRole: string;
  comment: string;
  rating: number;
}
