<template>
  <div
    class="bg-zinc-500 bg-gradient-to-br from-blue-500 to-pink-500 rounded-md p-4"
  >
    <p class="text-left">Nombre: {{ seller.name }}</p>
    <p class="text-left">Puntos</p>
    <p class="text-left">Actuales: {{ seller.points }}</p>
    <p class="text-left">Restantes: {{ limit - seller.points }}</p>
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
