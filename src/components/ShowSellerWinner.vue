<template>
  <div
    id="defaultModal"
    tabindex="-1"
    class="overflow-y-auto bg-gray-500 bg-opacity-10 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full md:h-full justify-center items-center flex"
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-full max-w-2xl h-auto md:h-auto">
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
            @click="() => $router.push('/invoice')"
            type="button"
            class="text-white rounded-md w-full md:w-40 top-0 py-2 p-x-6 bg-gradient-to-r from-blue-500 hover:bg-pink-600 relative right-0 font-bold cursor-pointer"
          >
            Crear factura
          </button>
          <button
            @click="startAgain"
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white rounded-md w-full md:w-40 top-0 py-2 p-x-6 bg-gradient-to-r from-blue-500 hover:bg-pink-500 relative right-0 font-bold cursor-pointer"
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
import { mapActions, mapMutations, mapState } from "vuex";

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
  methods: {
    ...mapMutations(["resetWinner", "setThereWinner", "resetTotalPoints"]),
    ...mapActions(["actionGetSellers"]),

    startAgain() {
      this.resetWinner();
      this.resetTotalPoints();
      this.setThereWinner(false);
      this.actionGetSellers();
    },
  },
});
</script>

<style></style>
