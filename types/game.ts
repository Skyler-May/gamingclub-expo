export type GameDifficulty = "easy" | "medium" | "hard";
export type GameCategory =
  | "all" // 全部
  | "puzzle" // 益智
  | "action" // 动作
  | "strategy" // 策略
  | "adventure" // 冒险
  | "card" // 卡牌
  | "music" // 音乐
  | "racing" // 赛车
  | "sports" // 体育
  | "simulation" // 模拟
  | "word" // 文字
  | "educational" // 教育
  | "entertainment" // 娱乐
  | "family" // 家庭
  | "arcade" // 街机
  | "board"; // 棋牌
export interface Game {
  id: string;
  title: string;
  type: string;
  description: string;
  thumbnail: string;
  rating: number;
  difficulty: GameDifficulty;
  category: GameCategory;
  playersOnline: number;
  isFeatured?: boolean;
  isNew?: boolean;
}
export interface GameCategoryTab {
  id: string;
  name: string;
  icon: string;
  category: GameCategory | "all";
}
export interface PlayerScore {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
}
