export interface Project {
  title: string;
  description: string;
  image?: string;
  startDate: string;
  endDate?: string;
  role: string;
  technologies: string[];
  status: 'ongoing' | 'completed';
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
      title: "Systematic Evaluation of LLMs for Mental Health Prediction",
      description: "Evaluating LLM-based workflows for mental health prediction using passive sensor data, covering model selection, context retrieval, and reasoning strategies.",
      startDate: "2025-05",
      endDate: "Present",
      role: "Research Lead",
      technologies: ["Context Engineering", "Sensor Data"],
      status: "ongoing",
      // image: "/images/projects/mental_llm_eval.png"
    },
    {
      title: "Multi-Agent System for Mental Health Diagnosis Support and Coaching",
      description: "Designing a multi-agent system that integrates patient and clinician agents to provide personalized mental health screening and lifestyle coaching.",
      startDate: "2025-05",
      endDate: "Present",
      role: "Co-Researcher",
      technologies: ["LLM", "Multi-Agent Systems", "AI Healthcare"],
      status: "ongoing",
      // image: "/images/projects/multi_agent_coaching.png"
    },
    // {
    //   title: "Enhancing Signal Quality Indices for Real-World PPG Signals",
    //   description: "Improving the reliability of physiological data through real-world PPG signal quality assessment",
    //   startDate: "2025-03",
    //   role: "Project Lead",
    //   technologies: ["Python", "PyTorch", "Signal Processing"],
    //   image: "/images/projects/ppg.png",
    // },
    {
      title: "Developing a mood detection model using Multi-Modal Data",
      description: "Developing a model to detect depression and anxiety using speech and sensor data from wearable, mobile, and IoT devices. This project is being conducted in collaboration with LG Electronics.",
      startDate: "2024-03",
      endDate: "2025-06",
      role: "Methodology and Model Development",
      technologies: ["PyTorch", "Sensor Fusion","Speech Emotion Recognition"],
      status: "completed",
      image: "/images/projects/lg_overview.png",
      links: {
        github: "https://github.com/Kaist-ICLab/multimodal-mh-detection",
        // demo: "https://www.researchgate.net/publication/3710000000000000000"
      }
    },
    {
      title: "Predicting Workload Stress in Call Center Employees",
      description: "Developed a model to predict call center workload by combining audio and text data. Funded by NRF Graduate Research Fellowship for Master's Students (2024.07 – 2025.06)",
      startDate: "2024-07",
      endDate: "2025-05",
      role: "Multimodal Model Development",
      technologies: ["PyTorch", "Hugging Face", "Audio Processing"],
      status: "completed",
      image: "/images/projects/regulation.png",
      links: {
        github: "https://github.com/Kaist-ICLab/EmoWorker"
      }
    },
    {
      title: "Interactive Reporting System for Digital Health Data",
      description: "Designing an interactive reporting system that helps evaluators interpret and explore digital health data with clarity and flexibility.",
      startDate: "2024-08",
      endDate: "2025-05",
      role: "Design and Research Lead",
      technologies: ["Figma", "Visualization"],
      status: "completed",
      image: "/images/projects/report.png",
    },
    
  ],
  past: [
  ]
}; 
