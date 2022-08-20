<template>
  <div
    class="bg-zinc-800 w-80 max-h-[85vh] gap-4 absolute flex flex-col top-0 rounded-md p-4"
  >
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
});
</script>

<style></style>
