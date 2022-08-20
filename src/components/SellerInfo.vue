<template>
  <div class="bg-zinc-500 rounded-md">
    <p class="text-left">Nombre: {{ seller.name }}</p>
    <p class="text-left">Puntos: {{ seller.points }}</p>
    <p class="text-left">pt restantes: {{ limit - seller.points }}</p>
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
