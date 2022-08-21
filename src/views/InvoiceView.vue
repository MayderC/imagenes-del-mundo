<template>
  <div class="w-full m-auto md:w-9/12">
    <div class="p-4 w-screen m-auto md:w-9/12">
      <h1 class="font-bold text-gray-200 p-2 m-auto rounded-lg bg-zinc-600">
        Factura
      </h1>
    </div>

    <main class="h-auto p-4 w-full m-auto md:w-9/12">
      <section class="bg-slate-200 rounded-md p-4">
        <div class="text-left font-semibold uppercase text-sm">
          <p>Vendedor: {{ winner.name }}</p>
          <p>Fecha: {{ invoiceRequest.date }}</p>
          <p>Fecha de expiración: {{ invoiceRequest.dueDate }}</p>
        </div>
        <div class="mt-4">
          <table-invoice-item
            :items="[item]"
            :titles="['Nombre', 'Cantidad', 'Precio']"
          ></table-invoice-item>
        </div>
        <footer class="flex flex-col">
          <div
            class="flex flex-col items-end pt-4 text-left font-semibold uppercase text-sm"
          >
            <p>Total: {{ total_points * item.price || 0 }}</p>
          </div>
          <button
            @click="senndData"
            class="bg-zinc-600 mt-4 text-gray-300 py-2 px-6 md:w-32 w-full rounded-md hover:bg-zinc-700"
          >
            Enviar
          </button>
        </footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import TableInvoiceItem from "@/components/TableInvoiceItem.vue";
import { IInvoiceRequest, IItem } from "@/interfaces/invoice.interface";
import { IProductItemResponse } from "@/interfaces/productItem.interface";
import { ISeller } from "@/interfaces/seller.interface";
import { getProductItem, makeInvoice } from "@/services/alegra.services";
import { defineComponent } from "vue";
import { mapState } from "vuex";

interface IComponentState {
  invoiceRequest: IInvoiceRequest;
  item: IItem;
  itemRespose: IProductItemResponse;
}

export default defineComponent({
  components: { TableInvoiceItem },
  name: "InvoiceView",
  data(): IComponentState {
    return {
      invoiceRequest: {
        payments: [],
        remissions: [],
        comments: [],
        quotas: [],
        stamp: {
          generateStamp: true,
        },
      } as IInvoiceRequest,
      item: {} as IItem,
      itemRespose: {} as IProductItemResponse,
    };
  },
  created() {
    getProductItem(3).then((res) => {
      const index = Math.floor(Math.random() * res.length);
      this.itemRespose = res[index];
      this.prepareInvoice(this.winner);
    });
  },
  computed: {
    ...mapState(["total_points", "winner"]),
  },
  methods: {
    async senndData() {
      const res = await makeInvoice(this.invoiceRequest);
      if (!res) return;

      console.log(res);
      //todo, hide invoice request info, show response in another component
      //in the same place
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
    prepareInvoice(winner: ISeller) {
      const date = new Date();
      const dueDate = new Date(date);
      this.invoiceRequest.date = this.getDate(date);
      this.invoiceRequest.dueDate = this.getDueDate(1, dueDate);
      this.invoiceRequest.seller = winner.id;

      // todo, get client from api
      this.invoiceRequest.client = "1";

      this.item = {
        id: this.itemRespose.id,
        price: Number(this.itemRespose.price[0].price),
        quantity: this.total_points,
        name: this.itemRespose.name,
      };

      this.invoiceRequest.items = [{ ...this.item }];
    },
  },
});
</script>
