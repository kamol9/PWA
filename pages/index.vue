<template>
  <div>
    <NuxtLink to="/invoices/add">Add new Invoices</NuxtLink>
  </div>
  <br />
  <br />
  <br />
  <br />

  <div>
    <div v-if="invoices && invoices.length > 0">
      <div v-for="invoice in invoices">
        <div>
          <div>{{ invoice.company.name }}</div>
          <NuxtLink :to="`/invoices/${invoice.id}`">Go to Details</NuxtLink>
          <button type="button" @click="handleDelete(invoice.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else>Empty</div>
  </div>
</template>

<script lang="ts" setup>
import type { InvoicesBody } from "../server/api/invoices";

const { data: invoices, refresh } = await useFetch<InvoicesBody[]>(
  "/api/invoices"
);

const handleDelete = async (id: string) => {
  await useFetch(`/api/invoices/${id}/delete`, {
    method: "DELETE",
  });

  refresh();
};
</script>
