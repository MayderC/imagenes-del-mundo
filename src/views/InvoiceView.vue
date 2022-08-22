<template>
  <div class="w-full m-auto lg:w-9/12">
    <div class="p-4 w-screen m-auto md:w-9/12">
      <h1
        class="font-bold text-white p-2 m-auto rounded-lg bg-gradient-to-r from-blue-500 to-pink-500"
      >
        Factura
      </h1>
    </div>

    <main class="h-auto p-4 w-full m-auto md:w-9/12">
      <section
        v-if="isReceived === false"
        class="bg-neutral-900 rounded-md p-4"
      >
        <div class="text-left text-purple-300 font-semibold uppercase text-sm">
          <p>
            Vendedor: <span> {{ winner.name }}</span>
          </p>
          <p>
            Fecha: <span>{{ invoiceRequest.date }}</span>
          </p>
          <p>
            Fecha de expiración: <span>{{ invoiceRequest.dueDate }}</span>
          </p>
        </div>
        <div class="mt-4">
          <table-invoice-item
            :items="[item]"
            :titles="['Nombre', 'Cantidad', 'Precio', 'Total']"
          ></table-invoice-item>
        </div>
        <footer class="flex flex-col text-purple-300">
          <div
            class="flex flex-col items-end pt-4 text-left font-semibold uppercase text-sm"
          >
            <p>
              Total: {{ getCurrencyFormat(total_points * item.price || 0) }}
            </p>
          </div>
          <button
            @click="sendData"
            :disabled="wasSent"
            :class="{ 'bg-zinc-900 hover:bg-zinc-900': wasSent }"
            class="bg-zinc-600 mt-4 text-gray-300 py-2 px-6 md:w-32 w-full rounded-md hover:bg-zinc-700"
          >
            Enviar
          </button>
        </footer>
      </section>
      <section v-else class="bg-neutral-900 rounded-md p-4 lg:p-10">
        <header
          class="font-semibold uppercase space-y-2 text-purple-300 text-sm"
        >
          <div class="mb-8">
            <h2>Imagenes del Mundo</h2>
            <p>
              Factura ID: <span>{{ invoiceResponse.id }}</span>
            </p>
          </div>
          <div class="md:flex justify-between space-y-2 md:flex-row">
            <div class="text-left space-y-2">
              <p>
                Fecha:
                <span class="text-purple-200">{{ invoiceResponse.date }}</span>
              </p>
              <p>
                Vencimiento:
                <span class="text-purple-200">{{
                  invoiceResponse.dueDate
                }}</span>
              </p>
            </div>
            <div class="text-left space-y-2">
              <p>
                Cliente:
                <span class="text-purple-200">{{
                  invoiceResponse.client?.name
                }}</span>
              </p>
              <p>
                identificación:
                <span class="text-purple-200">{{
                  invoiceResponse.client?.id
                }}</span>
              </p>
              <p>
                Telefono:
                <span class="text-purple-200">{{
                  invoiceResponse.client?.phonePrimary
                }}</span>
              </p>
            </div>
          </div>
        </header>
        <div>
          <table-invoice-item
            class="mt-4"
            :items="invoiceResponse.items"
            :titles="['Nombre', 'Cantidad', 'Precio', 'Total']"
          ></table-invoice-item>
        </div>
        <footer class="flex flex-col mt-6 font-semibold uppercase text-sm">
          <div class="text-left self-end space-y-2 text-purple-300">
            <p>
              Subtotal:
              <span class="text-purple-200">{{
                getCurrencyFormat(invoiceResponse.subtotal || 0)
              }}</span>
            </p>
            <p>
              Descuento:
              <span class="text-purple-200">{{
                getCurrencyFormat(invoiceResponse.discount || 0)
              }}</span>
            </p>

            <p>
              Total:
              <span class="text-purple-200">{{
                getCurrencyFormat(invoiceResponse.total || 0)
              }}</span>
            </p>
          </div>
          <div class="w-full mt-4 flex">
            <button
              @click="startAgain"
              :class="{ 'bg-zinc-900 hover:bg-zinc-900': wasSent }"
              class="bg-zinc-600 mt-4 text-gray-300 py-2 px-6 md:w-auto w-full rounded-md hover:bg-zinc-700"
            >
              Comenzar de Nuevo
            </button>
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import TableInvoiceItem from "@/components/TableInvoiceItem.vue";
import { CURRENCY_FORMAT } from "@/constants";
import { IInvoiceRequest, IItem } from "@/interfaces/invoice.interface";
import { IInvoiceResponse } from "@/interfaces/invoiceResponse.interface";
import { IProductItemResponse } from "@/interfaces/productItem.interface";
import { ISeller } from "@/interfaces/seller.interface";
import { getProductItem, makeInvoice } from "@/services/alegra.services";
import store from "@/store";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

interface IComponentState {
  invoiceRequest: IInvoiceRequest;
  item: IItem;
  wasSent: boolean;
  isReceived: boolean;
  itemRespose: IProductItemResponse;
  invoiceResponse: IInvoiceResponse;
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
      wasSent: false,
      isReceived: false,
      itemRespose: {} as IProductItemResponse,
      invoiceResponse: {} as IInvoiceResponse,
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
    total_points: (): number => store.state.total_points,
    winner: (): ISeller => store.state.winner,
  },
  methods: {
    ...mapMutations(["resetWinner", "setThereWinner", "resetTotalPoints"]),

    async sendData() {
      this.wasSent = true;
      const res = await makeInvoice(this.invoiceRequest);
      this.isReceived = true;
      this.invoiceResponse = res;
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

      //client id
      this.invoiceRequest.client = "1";

      this.item = {
        id: this.itemRespose.id,
        price: Number(this.itemRespose.price[0].price),
        quantity: this.total_points,
        name: this.itemRespose.name,
      };

      this.invoiceRequest.items = [{ ...this.item }];
    },

    getCurrencyFormat(total: number): string {
      return new Intl.NumberFormat(CURRENCY_FORMAT.locale, {
        style: "currency", //default currency
        currency: CURRENCY_FORMAT.currency,
      }).format(total);
    },
    startAgain() {
      this.resetWinner();
      this.resetTotalPoints();
      this.setThereWinner(false);

      // the home ('/') component makes an http request, to get sellers again
      this.$router.push("/");
    },
  },
});
</script>
