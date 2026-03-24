export interface Profile {
  name: string;
  koreanName?: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  image: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    researchGate?: string;
    scholar?: string;
    [key: string]: string | undefined;
  };
  education: {
    degree: string;
    department: string;
    departmentUrl: string;
    institution: string;
    institutionUrl: string;
    year: string;
  }[];
  skills: string[];
  about: string;
  interests: {
    "AI/ML": string[];
    "Applications": string[];
  };
  relatedWebsite: {
    title: string;
    url: string;
  };
  lab: {
    name: string;
    fullName: string;
    url: string;
    advisor: string;
  };
  cvUrl: string;
}

export const profileData: Profile = {
  name: "Gyuna Kim",
  koreanName: "김규나",
  title: "ML Engineer · AI Researcher",
  email: "gyuna.kim@kaist.ac.kr",
  location: "Incheon, Republic of Korea",
  bio: "Researching signals (physiological, wearable, speech) for digital health and mental well-being | M.S. student @ KAIST ICLab",
  image: "/images/photos/profile.jpg",
  socialLinks: {
    github: "https://github.com/gn0219",
    linkedin: "https://www.linkedin.com/in/gyuna/",
    scholar: "https://scholar.google.com/citations?user=YOUR_ID"
  },
  education: [
    {
      degree: "M.S.",
      department: "Graduate School of Data Science",
      departmentUrl: "https://gsds.kaist.ac.kr/",
      institution: "KAIST",
      institutionUrl: "https://www.kaist.ac.kr/",
      year: "2024.03 - 2026.02"
    },
    {
      degree: "B.S.",
      department: "Industrial Engineering",
      departmentUrl: "https://ie.unist.ac.kr/",
      institution: "UNIST",
      institutionUrl: "https://www.unist.ac.kr/",
      year: "2020.03 - 2024.02"
    }
  ],
  skills: [
  ],
  about: `I am an AI researcher and engineer with an M.S. from [KAIST ICLab](https://ic.kaist.ac.kr/, color=blue), advised by Prof. Uichin Lee.
My work focuses on building and evaluating AI systems that learn from real-world, multimodal data, with experience spanning LLM evaluation, context engineering, agent systems, and sensor-based modeling.
Across projects in healthcare, interactive systems, and applied AI, I have been interested in how data, models, and system design come together to support reliable and useful decision-making.
Most recently, I studied how context engineering affects the performance and efficiency of LLMs in passive sensing-based inference. 
Ultimately, I aim to build AI systems that are practical, interpretable, and adaptable to real-world environments.
`,
  interests: {
    "AI/ML": [
      "LLM Context Engineering",
      "Multi-Agent Systems",
      "Multimodal Data Analysis",
    ],
    "Applications": [
      "AI Healthcare",
      "Digital Phenotyping",
      "Physical AI Safety",
      "Interactive Systems"
    ]
  },
  relatedWebsite: {
    title: "ICLab in KAIST",
    url: "https://kaist-iclab.github.io"
  },
  lab: {
    name: "KAIST ICLab",
    fullName: "KAIST Interactive Computing Laboratory",
    url: "https://ic.kaist.ac.kr/",
    advisor: "Prof. Uichin Lee"
  },
  cvUrl: "/gyuna_cv_2025_4.pdf"
}; 