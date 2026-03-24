export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: 'journal' | 'conference' | 'workshop' | 'thesis';
  status?: 'published' | 'under revision' | 'submitted';
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
    {
      title: "COMPass: Literature Review and Systematic Evaluation of Context-Oriented Mental Health Modeling from Passive Sensing",
      authors: ["Gyuna Kim", "Youngji Koh", "Uichin Lee"],
      status: 'submitted',
      venue: "",
      year: "",
      type: "conference",
      github: "https://github.com/gn0219/compass-sensor-llm-mh-prediction",
    },
    {
      title: "A Multimodal Sensor Fusion Approach Using Mobile, Wearable, and IoT Sensors for Mental Health Detection",
      authors: ["Youngji Koh", "Gyuna Kim", "Chanhee Lee", "Panyu Zhang",
        "Yunhee Ku", "Inhwan Choi", "Jewoo Ryu", "Uichin Lee"],
      status: 'under revision',
      venue: "Submitted to IEEE Journal of Biomedical and Health Informatics",
      year: "",
      type: "journal",
      github: "https://github.com/Kaist-ICLab/multimodal-mh-detection",
    },
    {
      title: "A Multimodal Dataset for Assessing Emotion, Stress, and Emotional Workload in Interpersonal Work Scenario",
      authors: ["Duri Lee", "Eunji Park", "Gyuna Kim", "Yunjo Han", "Uichin Lee"],
      status: 'published',
      venue: "Scientific Data",
      year: "2026",
      type: "journal",
      doi: "10.1038/s41597-025-06531-2",
      github: "https://github.com/Kaist-ICLab/EmoWorker",
    }
  ]
};
