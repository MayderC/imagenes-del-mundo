import { createStore } from "vuex";
import { IState } from "./../interfaces/store.interface";
import { ISeller } from "./../interfaces/seller.interface";
import { login } from "./../services/auth.services";
import { getSellers } from "./../services/alegra.services";
import { SELLER_ACTIVE } from "@/constants";
import { POINTS } from "./../constants/index";

export default createStore<IState>({
  state: {
    sellers: [],
    token: "",
    total_points: 0,
  },
  getters: {
    sellersID: (state: IState) => state.sellers.map((s) => s.id),
  },
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

    setToken(state: IState) {
      state.token = login(
        process.env.VUE_APP_ALEGRA_EMAIL,
        process.env.VUE_APP_ALEGRA_TOKEN
      );
    },
  },
  actions: {
    async actionGetSellers(ctx) {
      const sellers = await getSellers(ctx.state.token);
      //these seller don't have the points property, was used map to add
      const sellersActive = sellers.filter((s) => s.status === SELLER_ACTIVE);
      const sellerwithPoints = sellersActive.map((s) => ({ ...s, points: 0 }));
      ctx.commit("setSellers", sellerwithPoints);
    },
  },
  modules: {},
});
