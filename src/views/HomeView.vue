<template>
  <div class="home p-6">
    <h1
      class="font-extrabold text-transparent h-24 text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
    >
      Imágenes del mundo
    </h1>
    <search-input @search="search"></search-input>

    <section class="flex gap-4 justify-center flex-wrap mt-6 min-w-[300px] p-6">
      <loading-spinner
        v-if="canShowSpinner"
        class="mt-6 m-auto"
      ></loading-spinner>
      <card-image
        v-for="img in images"
        :image="img"
        :key="img.id"
        @like="like"
      ></card-image>
      <h2
        v-if="
          total_points === 0 && images.length < 1 && canShowSpinner == false
        "
        class="font-extrabol text-blue-200 text-4xl"
      >
        Busca una imagen y elige la que más te guste.
      </h2>
      <h1
        v-else-if="
          total_points > 0 && images.length < 1 && canShowSpinner == false
        "
        class="font-extrabol text-blue-200 text-4xl"
      >
        Continúa buscado tus imágenes favoritas.
      </h1>
    </section>
  </div>
</template>

<script lang="ts">
import { getImages } from "@/services/images.services";
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent } from "vue";
import { IImage, IUnsplashAPI } from "@/interfaces/image.interface";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchInput from "@/components/SearchInput.vue";
import CardImage from "@/components/CardImage.vue";
import { LIMIT_TO_WIN, POINTS } from "@/constants";
//import { mapState } from "vuex";

interface IComponentState {
  imageName: "";
  sellers: ISeller[];
  images: IImage[];
  canShowSpinner: boolean;
  total_points: number;
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
      total_points: 0,
    };
  },
  components: {
    LoadingSpinner,
    SearchInput,
    CardImage,
  },

  methods: {
    async search(name: string) {
      this.images = [];
      this.canShowSpinner = true;
      const imagesWithoutSeller = await getImages(name);
      const firstThreeImages =
        this.selectFirstThree<IUnsplashAPI>(imagesWithoutSeller);
      this.images = this.assignSellerIDToImage(firstThreeImages);
      this.canShowSpinner = false;
    },

    like(sellerID: number) {
      const index = this.addPoints(sellerID);
      if (!this.isWinner(index)) return;

      //winner
      //todo: next steps
    },

    //this method also, return the index where the points were added
    addPoints(sellerID: number): number {
      for (let i = 0; i < this.sellers.length; i++) {
        if (this.sellers[i].id === sellerID) {
          this.sellers[i].points += POINTS;
          this.total_points += POINTS;
          this.images = [];
          return i;
        }
      }
      return -1;
    },

    assignSellerIDToImage(images: IUnsplashAPI[]): IImage[] {
      const sellerIDs = this.sellers.map((s) => s.id);
      return images.map((img, index) => ({
        ...img,
        sellerID: sellerIDs[index],
      }));
    },

    //todo, rename and change, 3 to sellers.length
    selectFirstThree<T>(arr: T[]): T[] {
      return arr.splice(0, 3);
    },

    isWinner(index: number) {
      return this.sellers[index].points >= LIMIT_TO_WIN;
    },
  },
});
</script>
