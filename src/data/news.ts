export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

export const newsData: NewsItem[] = [
  {
    date: "2025-04",
    title: "CHI conference 2025",
    description: "I will be attending [CHI 2025](https://chi2025.acm.org/, color=purple) in Yokohama, Japan"
  },
  {
    date: "2024-07",
    title: "SIGCHI Local Chapter",
    description: "I visited [SIGCHI Korea Local Chapter](https://2024summer.sigchi.kr/, color=purple) in July 2024"
  },
  {
    date: "2024-02",
    title: "News will be updated in ICLab",
    description: "I started my master's program at KAIST in February 2024"
  }
]; 