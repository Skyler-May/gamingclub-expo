export interface GamePlayData {
  id: number;
  title: string;
  onPress?: () => void;
}

export const gamePlayModes: GamePlayData[] = [
  { id: 1, title: "A 玩法" },
  { id: 2, title: "B 玩法" },
  { id: 3, title: "C 玩法" },
  { id: 4, title: "D 玩法" },
  { id: 5, title: "E 玩法" },
  { id: 6, title: "F 玩法" },
];
