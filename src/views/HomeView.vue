<template>
  <div class="home p-6">
    <h1
      class="font-extrabold text-transparent h-24 text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
    >
      Imaganes del mundo
    </h1>
    <search-input @search="search"></search-input>

    <loading-spinner
      v-if="!canShowSpinner"
      class="mt-6 m-auto"
    ></loading-spinner>
    <section class="flex gap-4 justify-center flex-wrap min-w-[300px] p-6">
      <div
        class="flex flex-col items-center bg-slate-200 p-3 rounded-md"
        v-for="img in images"
        :key="img.link"
      >
        <div class="w-36 h-32 flex justify-center">
          <img
            class="block h-32 w-32 object-cover"
            :src="img.original"
            alt=""
          />
        </div>
        <button
          type="button"
          @click="addPoints(img.sellerID)"
          class="border flex items-center gap-1 bg-purple-400 text-white rounded-md px-4 py-2 m-2 mt-6 transition duration-500 ease select-none hover:bg-purple-500 focus:outline-none focus:shadow-outline"
        >
          <img
            class="block w-6"
            src="../assets/img/heart_like.svg"
            alt=""
            srcset=""
          />
          Me gusta
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { getImages } from "@/services/images.services";
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent } from "vue";
import { IImageGoogleAPI, IImage } from "@/interfaces/image.interface";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchInput from "@/components/SearchInput.vue";
import { login } from "@/services/auth.services";
//import { mapState } from "vuex";

interface IComponentState {
  imageName: "";
  sellers: ISeller[];
  images: IImage[];
  canShowSpinner: boolean;
}

export default defineComponent({
  name: "HomeView",
  data(): IComponentState {
    return {
      imageName: "",
      sellers: [
        { id: 1, points: 0 },
        { id: 2, points: 0 },
        { id: 3, points: 0 },
      ] as ISeller[],
      images: [] as IImage[],
      canShowSpinner: false,
    };
  },
  components: {
    LoadingSpinner,
    SearchInput,
  },

  created() {
    console.log(login("may-dev@outlook.es", "3e84c6db2aef059ffb77"));
  },

  methods: {
    async search(name: string) {
      const imagesWithoutSeller = await getImages(name);
      console.log(imagesWithoutSeller);
      const firstThreeImages =
        this.selectFirstThree<IImageGoogleAPI>(imagesWithoutSeller);
      this.images = this.assignSeller(firstThreeImages);
    },

    like() {
      console.log("lik");
    },

    addPoints(sellerID: number) {
      for (let i = 0; i < this.sellers.length; i++) {
        if (this.sellers[i].id === sellerID) {
          this.sellers[i].points += 3;
          console.log(typeof i);
          this.checkWinner(i);
          return;
        }
      }
    },

    assignSeller(images: IImageGoogleAPI[]): IImage[] {
      const sellerIDs = this.sellers.map((s) => s.id);
      return images.map((img, index) => ({
        ...img,
        sellerID: sellerIDs[index],
      }));
    },

    selectFirstThree<T>(arr: T[]): T[] {
      return arr.splice(0, 3);
    },

    checkWinner(index: number) {
      console.log(index);
    },
  },
});
</script>
