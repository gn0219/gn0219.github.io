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
}

export interface PublicationsData {
  publications: Publication[];
}

export const publicationsData: PublicationsData = {
  publications: [
    // {
    //   title: "Voice-Controlled Smart Home Interfaces for Elderly Users",
    //   authors: ["Gyuna Kim", "Robert Brown", "Sarah Wilson"],
    //   venue: "Accessibility",
    //   year: "2021",
    //   type: "conference",
    //   doi: "10.1145/3441852.3471234",
    //   slides: "/images/publications/slides.pdf",
    //   poster: "/images/publications/poster.pdf",
    //   video: "/images/publications/video.mp4",
    // },
    // {
    //   title: "Signal Processing for Wearable Devices",
    //   authors: ["Gyuna Kim",],
    //   venue: "ACM SIGACCESS Conference on Computers and Accessibility",
    //   year: "2021",
    //   type: "conference",
    //   doi: "10.1145/3441852.3471234",
      
    // }
  ]
}; 