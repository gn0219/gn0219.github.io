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
  },
  {
    role: "Teaching & Academic Support",
    experiences: [
      {
        year: "2025 Spring",
        title: "Teaching Assistant, CS565_DS522 IoT Data Science",
        institution: "KAIST"
      },
      {
        year: "Jul 2022 – Oct 2022",
        title: "Student Supporter, Starmooc Lecture Video Production",
        institution: "UNIST"
      }
    ]
  },
  {
    role: "Mentorship & Outreach",
    experiences: [
      {
        year: "Winter 2024, Summer 2025",
        title: "Mentor, Research Internship",
        institution: "KAIST ICLab"
      },
      {
        year: "Jan 2022",
        title: "Mentor, Explore@UNIST – High School Science & Tech Leadership Camp",
        institution: "UNIST"
      },
      {
        year: "Apr 2021 – Oct 2021",
        title: "Mentor, Club-to-Club Entrepreneurship Mentorship for High School Students",
        institution: "UNIST"
      }
    ]
  }
]; 