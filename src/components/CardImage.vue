<template>
  <div class="flex flex-col items-center bg-slate-200 p-3 rounded-md">
    <div class="w-48 h-44 flex justify-center">
      <img
        class="block h-44 w-48 rounded-md object-cover"
        :src="image.urls.small"
        alt=""
      />
    </div>
    <button
      type="button"
      @click="like(image.sellerID)"
      class="border flex items-center gap-1 bg-purple-500 text-white rounded-md px-4 py-2 m-2 mt-6 transition duration-500 ease select-none hover:bg-purple-500 focus:outline-none focus:shadow-outline"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        :fill="fill"
        :stroke="stroke"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-heart heart"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        ></path>
      </svg>
      Me gusta
    </button>
  </div>
</template>

<script lang="ts">
import { IImage } from "@/interfaces/image.interface";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "CardImage",
  props: {
    image: {
      required: true,
      type: Object as PropType<IImage>,
    },
  },
  data() {
    return {
      fill: "white",
      stroke: "white",
    };
  },
  methods: {
    like(id: number) {
      this.fill = "red";
      this.stroke = "red";
      this.$emit("like", id);
    },
  },
});
</script>

<style scoped>
.heart {
  transition: stroke 0.2s ease-in-out;
}
</style>
