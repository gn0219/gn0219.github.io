export interface Service {
  category: string;
  items: {
    year: string;
    title: string;
    role?: string;
  }[];
}

export const servicesData: Service[] = [
  // {
  //   category: "Organizing",
  //   items: [
  //     {
  //       year: "2025",
  //       title: "SIGCHI Local Chapter Member"
  //     },
  //   ]
  // },
  // {
  //   category: "Reviewing",
  //   items: [
  //     {
  //       year: "2023-2025",
  //       title: "CHI"
  //     },
  //     {
  //       year: "2024-2025",
  //       title: "IMWUT"
  //     },
  //   ]
  // }
]; 