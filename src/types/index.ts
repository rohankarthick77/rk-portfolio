export type CursorType = 'default' | 'link' | 'project' | 'view' | 'explore' | 'drag' | 'sound' | 'magnetic';

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  description: string;
  problemStatement: string;
  architecturalSolution: string;
  keyFeatures: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  image: string;
  mockupType: 'map' | 'telemetry' | 'calendar' | 'network' | 'ml' | 'iot' | 'hardware';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'tools' | 'competencies';
  experienceYears: number;
  level: string;
  description: string;
  connectedTo: string[];
  highlightCode?: string;
  iconName: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  skills: string[];
  verified: boolean;
  image?: string;
  pdfUrl?: string;
  credentialUrl?: string;
  topics?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cinematography' | 'Visual Architecture' | 'Generative 3D' | 'Editorial' | 'Hardware Labs';
  year: string;
  image: string;
  aspect: 'square' | 'portrait' | 'landscape';
  description: string;
  cameraInfo: {
    lens?: string;
    iso?: string;
    shutter?: string;
    aperture?: string;
    sensor?: string;
  };
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  organization: string;
  badge: string;
  category: 'Hackathon' | 'Technical Milestone' | 'Open Source' | 'Academic Distinction';
  description: string;
  impactMetrics: string;
  tags: string[];
}
