export interface Project {
  title: string;
  description: string;
  image?: string;
  images?: string[];
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
      title: "Systematic Evaluation of Context Engineering for LLM-based Passive Sensing",
      description: "Studying how context engineering choices affect the performance and efficiency of LLM-based inference from passive sensor data. I designed the evaluation pipeline and compared representation, retrieval, in-context learning, and reasoning strategies across multiple LLMs and datasets.",
      startDate: "2025-05",
      endDate: "Present",
      role: "Lead Researcher — Study design, evaluation pipeline, and analysis",
      technologies: ["Context Engineering", "Sensor Data"],
      status: "ongoing",
      images: [
        "/images/projects/compass_overview.png",
        "/images/projects/compass_prompt.png",
        "/images/projects/compass_representation.png",
        "/images/projects/compass_features.png",
        "/images/projects/compass_icl.png",
      ]
    },
    {
      title: "Multi-Agent Clinical Support System for Mental Health",
      description: "Designed a multi-agent system that combines role-specific expert agents and a moderator to support mental health screening and lifestyle coaching. I built the sensor summarization pipeline, implemented the pilot system and dashboard.",
      startDate: "2025-05",
      endDate: "2026-02",
      role: "Co-Researcher — Agent workflow design and prototype development",
      technologies: ["LLM", "Multi-Agent Systems", "AI Healthcare"],
      status: "ongoing",
      image: "/images/projects/choral_dashboard.png"
    },
    {
      title: "Physical AI Safety for Industrial Environments",
      description: "Analyzed safety risks in Physical AI, VLA, and agentic AI systems from the perspective of industrial safety management. I structured key risks such as jailbreaks and agentic misalignment, and contributed to proposal and paper drafting for safety-aware system design.",
      startDate: "2025-08",
      endDate: "Present",
      role: "Co-Researcher — Literature review and Research framing",
      technologies: ["Physical AI", "AI Safety", "Agentic AI"],
      status: "ongoing",
      // image: "/images/projects/physical_ai.png"
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
      title: "Multimodal Mood Detection with Mobile, Wearable, and Smart Home Sensors",
      description: "Developed multimodal models for detecting depression and anxiety from mobile, wearable, speech, and smart home sensor data in collaboration with LG Electronics. I contributed to methodology, model development, and analysis.",
      startDate: "2024-03",
      endDate: "2025-06",
      role: "Co-Researcher — Sensor fusion design",
      technologies: ["PyTorch", "Sensor Fusion","Speech Emotion Recognition"],
      status: "completed",
      images: [
        "/images/projects/smarthome_overview.png",
        "/images/projects/smarthome.png",
        "/images/projects/smarthome_pipeline.png",
        "/images/projects/smarthome_feature.png",
      ],
      links: {
        github: "https://github.com/Kaist-ICLab/multimodal-mh-detection",
        // demo: "https://www.researchgate.net/publication/3710000000000000000"
      }
    },
    {
      title: "Multimodal Stress Detection for Call Center Employees",
      description: "Built multimodal models for detecting employee stress from Korean audio and text data collected in call center settings. I worked on data construction, utterance-level preprocessing, and language-model-based stress detection, and the project was supported by the NRF Graduate Research Fellowship for Master's Students.",
      startDate: "2024-07",
      endDate: "2025-05",
      role: "Dataset design and multimodal model development",
      technologies: ["PyTorch", "Hugging Face", "Audio Processing"],
      status: "completed",
      image: "/images/projects/regulation.png",
      links: {
        github: "https://github.com/Kaist-ICLab/EmoWorker"
      }
    },
    {
      title: "Interactive Reporting System for Digital Health Data",
      description: "Designed an interactive reporting system to help evaluators explore and interpret digital health data more clearly and flexibly. I led the dashboard design and analysis of user needs for presenting complex longitudinal health information.",
      startDate: "2024-08",
      endDate: "2025-05",
      role: "Lead Researcher — Dashboard design and data interpretation workflow",
      technologies: ["Figma", "Visualization"],
      status: "completed",
      image: "/images/projects/report.png",
    },
    
  ],
  past: [
  ]
}; 
