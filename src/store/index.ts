import { createStore } from "vuex";
import { IState } from "./../interfaces/store.interface";
import { ISeller } from "./../interfaces/seller.interface";
import { login } from "./../services/auth.services";
import { getSellers } from "./../services/alegra.services";
import { SELLER_ACTIVE, START_POINTS } from "@/constants";
import { POINTS } from "./../constants/index";

export default createStore<IState>({
  state: {
    sellers: [],
    token: "",
    total_points: 0,
    winner: {} as ISeller,
    thereWinner: false,
  },
  getters: {},
  mutations: {
    setSellers(state: IState, sellers: ISeller[]) {
      state.sellers = sellers;
    },

    addPointsToSeller(state: IState, index: number) {
      state.sellers[index].points += POINTS;
    },

    sumTotalPoints(state: IState) {
      state.total_points += POINTS;
    },

    resetPoints(state: IState) {
      state.sellers.forEach((s) => (s.points = 0));
    },

    resetTotalPoints(state: IState) {
      state.total_points = 0;
    },

    setToken(state: IState) {
      state.token = login(
        process.env.VUE_APP_ALEGRA_EMAIL,
        process.env.VUE_APP_ALEGRA_TOKEN
      );
    },

    setThereWinner(state: IState, status: boolean) {
      state.thereWinner = status;
    },

    setWinner(state: IState, winner: ISeller) {
      state.winner = { ...winner };
    },
  },
  actions: {
    async actionGetSellers(ctx) {
      const sellers = await getSellers(ctx.state.token);
      //these seller don't have the points property, was used map to add
      const activeSeller = sellers.filter((s) => s.status === SELLER_ACTIVE);
      const sellerWithPoints = activeSeller.map((s) => {
        return { ...s, points: START_POINTS };
      });
      ctx.commit("setSellers", sellerWithPoints);
    },
  },
  modules: {},
});
