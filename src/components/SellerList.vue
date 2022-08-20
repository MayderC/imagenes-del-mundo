<template>
  <div
    class="bg-zinc-700 w-80 max-h-[85vh] absolute flex flex-col top-0 rounded-md p-4"
  >
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
