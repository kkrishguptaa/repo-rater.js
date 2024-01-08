export type GetRepos = {
  url: string;
  logo: string;
  description: string;
  rating: number;
  votes: number;
  owner: string;
  name: string;
  badgeViews: number;
  language: string;
  topics: string[];
  stars: number;
}[];
