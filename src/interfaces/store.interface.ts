import { ISeller } from "./seller.interface";

export interface IState {
  sellers: ISeller[];
  token: string;
  total_points: 0;
  winner: ISeller;
  thereWinner: boolean;
}
