<template>
  <div class="flex flex-col items-center bg-slate-200 p-3 rounded-md">
    <div class="w-36 h-32 flex justify-center">
      <img
        class="block h-32 w-36 rounded-md object-cover"
        :src="image.urls.small"
        alt=""
      />
    </div>
    <button
      type="button"
      @click="like(image.sellerID)"
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
  methods: {
    like(id: number) {
      this.$emit("like", id);
    },
  },
});
</script>
