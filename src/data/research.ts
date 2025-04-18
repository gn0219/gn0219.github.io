export interface ResearchInterest {
  title: string;
  description: string;
  keywords: string[];
}

export interface ResearchData {
  interests: ResearchInterest[];
}

export const researchData: ResearchData = {
  interests: [
    {
      title: "Interactive Technologies for Understanding Human Data",
      description: "Designing interactive systems and visualizations to support digital mental health monitoring and interpretation",
      keywords: ["Interactive System", "Visualization", "Data Storytelling"]
    },
    {
      title: "Affective Computing",
      description: "Analyzing emotional and mental states using multimodal signals such as speech and physiological data",
      keywords: ["Emotion Recognition", "Speech Analysis", "Mental Health"]
    },
    {
      title: "Signal Processing",
      description: "Developing signal processing methods to improve the quality and usability of real-world sensor data",
      keywords: ["PPG", "Signal Quality", "Wearable Sensors"]
    }
  ]
}; 