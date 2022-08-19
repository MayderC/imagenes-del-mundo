<template>
  <div class="home p-6">
    <h1
      class="font-extrabold text-transparent h-24 text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
    >
      Imágenes del mundo
    </h1>
    <search-input @search="search"></search-input>

    <loading-spinner
      v-if="!canShowSpinner"
      class="mt-6 m-auto"
    ></loading-spinner>
    <section class="flex gap-4 justify-center flex-wrap min-w-[300px] p-6">
      <card-image
        v-for="img in images"
        :image="img"
        :key="img.id"
        @like="like"
      ></card-image>
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
    CardImage,
  },

  methods: {
    async search(name: string) {
      const imagesWithoutSeller = await getImages(name);
      const firstThreeImages =
        this.selectFirstThree<IUnsplashAPI>(imagesWithoutSeller);
      this.images = this.assignSellerIDToImage(firstThreeImages);
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
          this.sellers[i].points += 3;
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

    selectFirstThree<T>(arr: T[]): T[] {
      return arr.splice(0, 3);
    },

    isWinner(index: number) {
      return this.sellers[index].points >= 20;
    },
  },
});
</script>
