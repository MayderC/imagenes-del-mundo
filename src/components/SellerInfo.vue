<template></template>

<script lang="ts">
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SellerInfo",
  props: {
    sellers: {
      type: Array as PropType<ISeller[]>,
    },
  },
});
</script>

<style></style>
