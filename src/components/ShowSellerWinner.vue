<template>
  <div
    id="defaultModal"
    tabindex="-1"
    class="overflow-y-auto bg-gray-500 bg-opacity-10 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-zinc-700">
        <!-- Modal header -->
        <div class="flex p-4 rounded-t border-b dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Ganador de la carrera
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-2">
          <p class="text-gray-400 text-start">
            Nomre del Vendedor : {{ seller.name }}
          </p>
          <p class="text-gray-400 text-start">
            Puntos de {{ seller.name }} : {{ seller.points }}
          </p>
          <p class="text-gray-400 text-start">
            Puntos acumulados por todos los vendedores: {{ total_points }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            data-modal-toggle="defaultModal"
            @click="() => this.$router.push('/invoice')"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear factura
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Reiniciar carrera
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ISeller } from "@/interfaces/seller.interface";
import { defineComponent, PropType } from "@vue/runtime-core";
import { mapState } from "vuex";

export default defineComponent({
  props: {
    seller: {
      type: Object as PropType<ISeller>,
      required: true,
    },
  },
  name: "ShowSellerWinner",
  computed: {
    ...mapState(["total_points"]),
  },
});
</script>

<style></style>
