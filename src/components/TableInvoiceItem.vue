<template>
  <div class="overflow-x-auto relative rounded-md">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-zinc-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="title in titles"
            :key="title"
            scope="col"
            class="py-3 px-6"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
          class="bg-white dark:bg-zinc-800 dark:border-zinc-700"
        >
          <th class="py-4 px-6">{{ item.name }}</th>
          <th class="py-4 px-6">{{ item.quantity }}</th>
          <th class="py-4 px-6">{{ item.price }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { IItem } from "@/interfaces/invoice.interface";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "TableInvoiceItem",
  props: {
    titles: {
      type: Array as PropType<string[]>,
      required: true,
    },
    items: {
      type: Array as PropType<IItem[]>,
      required: true,
    },
  },
});
</script>

<style></style>
