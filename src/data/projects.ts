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
      description: "Improving the reliability of physiological data through real-world PPG signal quality assessment",
      startDate: "2025-03",
      role: "Project Lead",
      technologies: ["Python", "PyTorch", "Signal Processing"],
      image: "/images/projects/ppg.png",
    },
    {
      title: "Interactive Reporting System for Digital Health Data",
      description: "Designing an interactive reporting system that helps evaluators interpret and explore digital health data with clarity and flexibility.",
      startDate: "2024-08",
      endDate: "2025-06",
      role: "Design and Research Lead",
      technologies: ["Figma", "User Study", "Visualization"],
      image: "/images/projects/report.png",
    },
    {
      title: "Developing a mood detection model using Multi-Modal Data",
      description: "Developing a model to detect depression and anxiety using speech and sensor data from wearable, mobile, and IoT devices.",
      startDate: "2024-08",
      endDate: "2025-06",
      role: "Deep Learning Model Development",
      technologies: ["PyTorch", "Speech Emotion Recognition"],
    },
    {
      title: "Predicting Workload Stress in Call Center Employees",
      description: "Developed a model to predict call center workload by combining audio and text data.",
      startDate: "2024-01",
      endDate: "2024-04",
      role: "Multimodal Model Development",
      technologies: ["PyTorch", "Hugging Face", "Audio Processing"],
      image: "/images/projects/regulation.png",
      // links: {
      //   github: "https://github.com/Kaist-ICLab/KEmoWorker-utt"
      // }
    }
    
  ],
  past: [
  ]
}; 