export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

export const newsData: NewsItem[] = [
  {
    date: "2025-09",
    title: "K-Data Science Conference 2025",
    description: "I attended [K-Data Science Conference](https://kdatascience.kr/conference/event, color=green) in Daegu, Korea, and received the Creative Research Award 🏆"
  },
  {
    date: "2025-04",
    title: "CHI Conference 2025",
    description: "I attended [CHI 2025](https://chi2025.acm.org/, color=pink) in Yokohama, Japan 🌸"
  },
  {
    date: "2024-07",
    title: "SIGCHI Local Chapter",
    description: "I visited [SIGCHI Korea Local Chapter](https://2024summer.sigchi.kr/, color=blue) summer event 🛳️"
  },
  {
    date: "2024-02",
    title: "News will be updated in ICLab",
    description: "I started my master's program at KAIST, advised by Prof. Uichin Lee 🎊"
  }
]; 