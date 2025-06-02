export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: 'journal' | 'conference' | 'workshop' | 'thesis';
  doi?: string;
  link?: string;
  slides?: string;
  poster?: string;
  video?: string;
  github?: string;
}

export interface PublicationsData {
  publications: Publication[];
}

export const publicationsData: PublicationsData = {
  publications: [
    // {
    //   title: "A Multimodal Sensor Fusion Approach Using Mobile, Wearable, and IoT Sensors for Mental Health Detection",
    //   authors: ["Youngji Koh", "Gyuna Kim", "Chanhee Lee", "Panyu Zhang",
    //     "Yunhee Ku", "Inhwan Choi", "Jewoo Ryu", "Uichin Lee"],
    //   venue: "IEEE Internet of Things Journal",
    //   year: "2025",
    //   type: "journal",
    //   doi: "10.1109/THMS.2024.3390000",
    //   slides: "/images/publications/slides.pdf",
    //   poster: "/images/publications/poster.pdf",
    //   video: "/images/publications/video.mp4",
    //   github: "https://github.com/Kaist-ICLab/multimodal-mh-detection",
    // },
    // {
    //   title: "EmoWorker: A Multimodal Dataset for Assessing Emotion, Stress, and Emotional Workload in Interpersonal Work Scenario",
    //   authors: ["Duri Lee", "Eunji Park", "Gyuna Kim", "Yunjo Han", "Uichin Lee"],
    //   venue: "Scientific Data",
    //   year: "2025",
    //   type: "journal",
    //   // doi: "10.1038/s41597-025-02455-x",
    //   github: "https://github.com/Kaist-ICLab/EmoWorker",
    // }
  ]
}; 