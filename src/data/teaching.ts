export interface TeachingExperience {
  role: string;
  courses: {
    year: string;
    title: string;
    institution: string;
  }[];
}

export const teachingData: TeachingExperience[] = [
  // {
  //   role: "Instructor",
  //   courses: [
  //     {
  //       year: "2025",
  //       title: "CS565_DS522 IoT Data Science",
  //       institution: "Graduate School of Data Science, KAIST"
  //     },
  //   ]
  // },
  {
    role: "Teaching Assistant",
    courses: [
      {
        year: "2025 Spring",
        title: "CS565_DS522 IoT Data Science",
        institution: "KAIST"
      },
    ]
  }
]; 