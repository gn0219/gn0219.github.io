export interface ResearchInterest {
  title: string;
  description: string;
  keywords: string[];
}

export interface ResearchData {
  interests: ResearchInterest[];
  currentFocus: string[];
  methodologies: string[];
}

export const researchData: ResearchData = {
  interests: [
    {
      title: "Human-Computer Interaction",
      description: "Exploring novel interaction techniques and user interface designs to enhance user experience",
      keywords: ["HCI", "User Studies"]
    },
    {
      title: "Affective Computing",
      description: "Investigating affective computing and human-computer interaction",
      keywords: ["Affective Computing", "Human-Computer Interaction"]
    },
    {
      title: "Signal Processing",
      description: "Developing signal processing techniques for human-computer interaction",
      keywords: ["Signal Processing", "Human-Computer Interaction"]
    }
  ],
  currentFocus: [
    "Gesture-based interaction techniques",
    "Mobile health applications",
    "Accessibility in education technology"
  ],
  methodologies: [
    "User-centered design",
    "Qualitative research",
    "Prototyping",
    "User studies",
    "Data analysis"
  ]
}; 