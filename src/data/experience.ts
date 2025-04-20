export interface Experience {
  role: string;
  experiences: {
    year: string;
    title: string;
    institution: string;
  }[];
}

export const experienceData: Experience[] = [
  {
    role: "Teaching & Academic Support",
    experiences: [
      {
        year: "2025 Spring",
        title: "Teaching Assistant, CS565_DS522 IoT Data Science",
        institution: "[KAIST](https://www.kaist.ac.kr/en/, color=university)"
      },
      {
        year: "Jul 2022 – Oct 2022",
        title: "Student Supporter, Starmooc Lecture Video Production",
        institution: "[UNIST](https://www.unist.ac.kr/, color=university)"
      }
    ]
  },
  {
    role: "Work & Internship",
    experiences: [
      {
        year: "Jan 2024 – Feb 2024",
        title: "Research Intern (Mentor: Duri Lee, Advisor: Uichin Lee)",
        institution: "KAIST [ICLab](https://iclab.kaist.ac.kr/, color=blue)"
      },
      {
        year: "Feb 2022 – Feb 2023",
        title: "Data Analysis Intern Researcher",
        institution: "[INTERX](https://interxlab.com/, color=dark_brown) in Ulsan, Korea"
      },
      {
        year: "Feb 2021 – Aug 2021",
        title: "Data Analyst and UI/UX Designer",
        institution: "Travel Startup in Ulsan, Korea"
      }
    ]
  }
  // {
  //   role: "Mentorship & Outreach",
  //   experiences: [
  //     {
  //       year: "May 2023",
  //       title: "Mentor, Explore@UNIST",
  //       institution: "UNIST"
  //     },
  //     {
  //       year: "Apr 2021 – Oct 2021",
  //       title: "Mentor, Club to Club Entrepreneurship Education",
  //       institution: "UNIST"
  //     }
  //   ]
  // }
]; 