<template>
  <div class="">
    <div class="p-4 w-screen m-auto md:w-9/12">
      <h1 class="font-bold text-gray-200 p-2 m-auto rounded-lg bg-zinc-600">
        Factura
      </h1>
    </div>

    <main class="w-screen m-auto md:w-9/12 h-auto p-4">
      <section class="bg-slate-200 rounded-md">
        <h2>Factura N# : {{ 1 + 1 }}</h2>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { IInvoiceRequest, IItem } from "@/interfaces/invoice.interface";
import { ISeller } from "@/interfaces/seller.interface";
import { makeInvioce } from "@/services/alegra.services";
import { defineComponent } from "vue";
import { mapState } from "vuex";

interface IComponentState {
  invoiceRequest: IInvoiceRequest;
  items: IItem[];
}

export default defineComponent({
  name: "InvoiceView",
  data(): IComponentState {
    return {
      invoiceRequest: {} as IInvoiceRequest,
      items: [],
    };
  },
  created() {
    this.prepareInvoice(this.winner);
  },
  computed: {
    ...mapState(["total_points", "winner"]),
  },
  methods: {
    senndData() {
      makeInvioce(this.invoiceRequest);
    },
    prepareInvoice(winner: ISeller) {
      const date = new Date();
      const dueDate = new Date(date);
      this.invoiceRequest.date = this.getDate(date);
      this.invoiceRequest.dueDate = this.getDueDate(1, dueDate);
      this.invoiceRequest.seller = winner.id;

      // todo, get client from api
      this.invoiceRequest.client = 1;

      // todo get item from api
      const item: IItem = {
        id: 1,
        price: 200,
        quantity: this.total_points,
      };

      this.items.push(item);
      this.invoiceRequest.items = JSON.parse(JSON.stringify(this.items));
    },
    getDate(date: Date): string {
      return date.toLocaleDateString().split("/").reverse().join("-");
    },
    getDueDate(months: number, date: Date) {
      return new Date(date.setMonth(date.getMonth() + months))
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
    },
  },
});
</script>
