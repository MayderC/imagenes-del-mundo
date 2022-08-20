<template>
  <div class="">
    <h1
      class="font-extrabold text-transparent h-24 text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500"
    >
      Imágenes del mundo
    </h1>
    <span @click="() => this.$router.back()">back</span>
    <span @click="senndData" class="text-gray-100">click</span>
  </div>
</template>

<script lang="ts">
import { IInvoiceRequest, IItem } from "@/interfaces/invoice.interface";
import { makeInvioce } from "@/services/alegra.services";
import { defineComponent } from "vue";

interface IComponentState {
  invoice: IInvoiceRequest;
  items: IItem[];
}

export default defineComponent({
  name: "InvoiceView",
  data(): IComponentState {
    return {
      invoice: {} as IInvoiceRequest,
      items: [],
    };
  },
  methods: {
    senndData() {
      makeInvioce(this.invoice);
    },
  },
});
</script>
