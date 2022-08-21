<template>
  <div
    class="bg-zinc-800 w-80 max-h-[85vh] gap-4 absolute flex flex-col top-10 m-auto md:m-0 left-0 right-0 xl:left-6 xl:right-6 rounded-md p-4"
  >
    <button
      @click="closeModal"
      type="button"
      class="text-gray-400 bg-transparent absolute top-3 right-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-zinc-600"
      data-modal-toggle="defaultModal"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close modal</span>
    </button>
    <h2 class="text-purple-400 font-bold">Puntos de los vendedores</h2>
    <seller-info
      v-for="seller in sellers"
      :seller="seller"
      :key="seller.id"
    ></seller-info>
  </div>
</template>

<script lang="ts">
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent, PropType } from "@vue/runtime-core";
import SellerInfo from "./SellerInfo.vue";

export default defineComponent({
  props: {
    sellers: {
      type: Array as PropType<ISeller[]>,
    },
  },
  components: { SellerInfo },
  name: "SellerList",
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
});
</script>

<style></style>
