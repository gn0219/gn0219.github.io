export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: 'journal' | 'conference' | 'workshop' | 'thesis';
  doi?: string;
  link?: string;
  abstract?: string;
}

export interface PublicationsData {
  publications: Publication[];
}

export const publicationsData: PublicationsData = {
  publications: [
    // {
    //   title: "Voice-Controlled Smart Home Interfaces for Elderly Users",
    //   authors: ["Gyuna Kim", "Robert Brown", "Sarah Wilson"],
    //   venue: "ACM SIGACCESS Conference on Computers and Accessibility",
    //   year: "2021",
    //   type: "conference",
    //   doi: "10.1145/3441852.3471234",
    //   abstract: "We present a voice-controlled smart home interface specifically designed for elderly users, focusing on usability and accessibility..."
    // }
  ]
}; 