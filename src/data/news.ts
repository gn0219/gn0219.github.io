export interface NewsItem {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: NewsItem[] = [
  {
    date: "2025-04",
    title: "CHI conference 2025",
    description: "I will be attending CHI conference 2025 in Yokohama, Japan"
  },
  {
    date: "2024-02",
    title: "News will be updated in ICLab",
    description: "I started my master's degree at KAIST in February 2024"
  }
]; 