export type Language = 'bn' | 'en';

export interface Course {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  subtitle: {
    bn: string;
    en: string;
  };
  category: 'web-dev' | 'ai-prompt' | 'ui-ux-3d' | 'freelancing' | 'video-editing' | 'app-dev';
  categoryLabel: {
    bn: string;
    en: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  projectsCount: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  priceBDT: number;
  priceUSD: number;
  discountBDT: number;
  discountUSD: number;
  badge?: {
    bn: string;
    en: string;
    type: 'hot' | 'popular' | 'new' | 'flagship';
  };
  technologies: string[];
  features: {
    bn: string[];
    en: string[];
  };
  syllabus: {
    week: string;
    title: { bn: string; en: string };
    topics: { bn: string[]; en: string[] };
  }[];
  mentor: {
    name: string;
    role: string;
    company: string;
    rating: number;
    avatar: string;
  };
  avgFreelanceHourly: string;
  iconName: string;
  colorTheme: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: { bn: string; en: string };
  experience: string;
  specialty: string;
  studentsMentored: number;
  hourlyRate: string;
  rating: number;
  earnings: string;
  platform: 'Upwork Top Rated Plus' | 'Fiverr Pro' | 'Toptal' | 'Google Developer Expert';
  avatar: string;
  bio: { bn: string; en: string };
  skills: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: { bn: string; en: string };
  city: string;
  course: string;
  monthlyEarnings: string;
  platform: string;
  quote: { bn: string; en: string };
  avatar: string;
  stats: {
    before: string;
    after: string;
  };
}

export interface RoadmapStep {
  month: string;
  phase: { bn: string; en: string };
  title: { bn: string; en: string };
  description: { bn: string; en: string };
  deliverables: { bn: string[]; en: string[] };
  icon: string;
}

export interface LiveMasterclass {
  id: string;
  title: { bn: string; en: string };
  instructor: string;
  date: string;
  time: string;
  seatsLeft: number;
  totalSeats: number;
  tag: { bn: string; en: string };
}
