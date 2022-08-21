<template>
  <div
    class="bg-zinc-500 text-zinc-400 text-lg text-left bg-gradient-to-br from-zinc-900 to-zinc-900 rounded-md p-4"
  >
    <p class="">{{ seller.name }}</p>
    <p class="">Actuales: {{ seller.points }}</p>

    <!--ternary, dont show negative number-->
    <p class="">
      Restantes: {{ limit - seller.points > 0 ? limit - seller.points : 0 }}
    </p>
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
