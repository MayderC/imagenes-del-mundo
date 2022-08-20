<template>
  <div
    class="bg-zinc-500 text-white text-lg text-left bg-gradient-to-br from-purple-700 to-purple-400 rounded-md p-4"
  >
    <p class="">Nombre: {{ seller.name }}</p>

    <p class="">Actuales: {{ seller.points }}</p>
    <p class="">Restantes: {{ limit - seller.points }}</p>
    <p>Meta: {{ limit }}</p>
  </div>
</template>

<script lang="ts">
import { LIMIT_TO_WIN } from "@/constants";
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SellerInfo",
  props: {
    seller: {
      type: Object as PropType<ISeller>,
      required: true,
    },
  },
  data() {
    return {
      limit: LIMIT_TO_WIN,
    };
  },
});
</script>

<style></style>
