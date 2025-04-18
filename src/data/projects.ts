export interface Project {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  role: string;
  technologies: string[];
  link?: string;
  image?: string;
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
      // link: "https://github.com/gn0219/gesture-navigation"
    },
    {
      title: "Interactive Reporting System for Digital Health Data",
      description: "Developing an interactive reporting system for digital health data",
      startDate: "2024-08",
      endDate: "2025-06",
      role: "Lead Researcher",
      technologies: ["Figma", "User Study"]
      // link: "https://github.com/gn0219/gesture-navigation"
    },
  ],
  past: [
  ]
}; 