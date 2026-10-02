export interface Skill {
  name: string;
  techName?: string;
  category: string;
  icon: string; // name of Lucide icon or custom SVG key
  description?: string;
  level?: number; // percentage or descriptive label
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
  keyHighlights: string[];
  category: 'AI Systems' | 'Full Stack' | 'Frontend' | 'Utility';
  imagePlaceholder: string; // descriptive content to render a premium visual card graphic
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  achievements?: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  description: string;
  icon: string;
  year?: string;
  skills?: string[];
  keyPoints?: string[];
  certificateImage?: string;
  certificateId?: string;
  issueDate?: string;
  verificationUrl?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  type: 'academic' | 'skill' | 'milestone';
}
