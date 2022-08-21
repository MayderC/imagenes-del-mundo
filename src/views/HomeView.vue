<template>
  <div class="home p-6 relative min-h-[95vh]">
    <h1
      class="font-extrabold text-transparent h-24 text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
    >
      Imágenes del mundo
    </h1>
    <search-input @search="search"></search-input>

    <section
      class="flex gap-4 justify-center flex-wrap max-w-3xl m-auto mt-6 min-w-[300px] p-6"
    >
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
      <div v-if="!thereWinner">
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
      </div>
    </section>
    <seller-list
      v-if="canShowSellers"
      @close="canShowSellers = false"
      :sellers="sellers"
    ></seller-list>
    <show-seller-winner
      v-if="thereWinner"
      :seller="winner"
    ></show-seller-winner>
    <p
      @click="toggleSellerList"
      v-if="!canShowSellers"
      class="text-cyan-200 text-left relative bottom-0 left-4 font-bold underline cursor-pointer"
    >
      Ver vendedores
    </p>
  </div>
</template>

<script lang="ts">
import { getImages } from "@/services/images.services";
import { defineComponent } from "vue";
import { IImage, IUnsplashAPI } from "@/interfaces/image.interface";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SearchInput from "@/components/SearchInput.vue";
import CardImage from "@/components/CardImage.vue";
import { LIMIT_TO_WIN } from "@/constants";
import { mapActions, mapMutations, mapState } from "vuex";
import ShowSellerWinner from "@/components/ShowSellerWinner.vue";
import SellerList from "@/components/SellerList.vue";

interface IComponentState {
  imageName: "";
  images: IImage[];
  canShowSpinner: boolean;
  canShowSellers: boolean;
}

export default defineComponent({
  name: "HomeView",
  data(): IComponentState {
    return {
      imageName: "",
      images: [] as IImage[],
      canShowSpinner: false,
      canShowSellers: false,
    };
  },
  components: {
    LoadingSpinner,
    SearchInput,
    CardImage,
    ShowSellerWinner,
    SellerList,
  },
  created() {
    this.setToken();
    this.actionGetSellers();
  },
  computed: {
    ...mapState(["sellers", "total_points", "winner", "thereWinner"]),
  },
  methods: {
    ...mapMutations([
      "setToken",
      "addPointsToSeller",
      "sumTotalPoints",
      "setWinner",
      "setThereWinner",
    ]),
    ...mapActions(["actionGetSellers"]),

    async search(name: string) {
      this.images = [];
      this.canShowSpinner = true;

      const imagesWithoutSeller = await getImages(name);
      if (imagesWithoutSeller.length < this.sellers) return;

      const firstImages = this.selectImages(imagesWithoutSeller);
      this.canShowSpinner = false;
      this.images = this.assignSellerIDToImage(firstImages);
    },

    like(sellerID: number) {
      const index = this.sellerToaddPoints(sellerID);
      if (this.isWinner(index) == false || index === -1) return;

      this.setWinner(this.sellers[index]);
      this.setThereWinner(true);
    },

    toggleSellerList() {
      this.canShowSellers = !this.canShowSellers;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    //this method also, return the index where the points were added
    sellerToaddPoints(sellerID: number): number {
      for (let i = 0; i < this.sellers.length; i++) {
        if (this.sellers[i].id === sellerID) {
          this.addPointsToSeller(i);
          this.sumTotalPoints();
          this.images = [];
          return i;
        }
      }
      return -1;
    },

    assignSellerIDToImage(images: IUnsplashAPI[]): IImage[] {
      return images.map((img, index) => ({
        ...img,
        sellerID: this.sellers[index].id,
        sellerName: this.sellers[index].name,
      }));
    },

    selectImages(arr: IUnsplashAPI[]): IUnsplashAPI[] {
      return arr.splice(0, this.sellers.length);
    },

    isWinner(index: number) {
      return this.sellers[index].points >= LIMIT_TO_WIN;
    },
  },
});
</script>
