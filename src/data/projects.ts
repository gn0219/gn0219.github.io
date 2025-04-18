export interface Project {
  title: string;
  description: string;
  image?: string;
  startDate: string;
  endDate?: string;
  role: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export interface ProjectsData {
  current: Project[];
  past: Project[];
}

export const projectsData: ProjectsData = {
  current: [
    {
      title: "Enhancing Signal Quality Indices for Real-World PPG Signals",
      description: "Developing signal quality indices for PPG signals",
      startDate: "2025-03",
      role: "Lead Researcher",
      technologies: ["Python", "PyTorch", "Signal Processing"],
      image: "/images/projects/ppg.png",
      // link: "https://github.com/gn0219/gesture-navigation"
    },
    {
      title: "Interactive Reporting System for Digital Health Data",
      description: "Developing an interactive reporting system for digital health data",
      startDate: "2024-08",
      endDate: "2025-06",
      role: "Lead Researcher",
      technologies: ["Figma", "User Study", "Visualization"],
      image: "/images/projects/report.png",
      // link: "https://github.com/gn0219/gesture-navigation"
    },
    {
      title: "Developing a mood detection model using Multi-Modal Data",
      description: "Developing a mood detection model using Multi-Modal Data",
      startDate: "2024-08",
      endDate: "2025-06",
      role: "Developed Deep Learning Model",
      technologies: ["Python", "PyTorch", "Speech Emotion Recognition"],
      // link: "https://github.com/gn0219/gesture-navigation"
    },
  ],
  past: [
  ]
}; 