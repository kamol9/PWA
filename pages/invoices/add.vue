<template>
  <NuxtLink to="/">Home page </NuxtLink>

  <div>Add</div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="payment_date">Payment Date</label>
      <input
        type="date"
        id="payment_date"
        v-model="formData.payment_date"
        required
      />
    </div>

    <div>
      <label for="company_name">Company Name</label>
      <input
        type="text"
        id="company_name"
        v-model="formData.company.name"
        required
      />
    </div>

    <div>
      <label for="company_address">Company Address</label>
      <input
        type="text"
        id="company_address"
        v-model="formData.company.address"
        required
      />
    </div>

    <div>
      <label for="company_nip">Company NIP</label>
      <input
        type="text"
        id="company_nip"
        v-model="formData.company.nip"
        required
      />
    </div>

    <div>
      <label for="customer_name">Customer Name</label>
      <input
        type="text"
        id="customer_name"
        v-model="formData.customer.name"
        required
      />
    </div>

    <div>
      <label for="customer_address">Customer Address</label>
      <input
        type="text"
        id="customer_address"
        v-model="formData.customer.address"
        required
      />
    </div>

    <div>
      <label for="customer_nip">Customer NIP</label>
      <input
        type="text"
        id="customer_nip"
        v-model="formData.customer.nip"
        required
      />
    </div>

    <div>
      <div>Items:</div>

      <div v-for="(item, index) in formData.items">
        <div>
          <label for="item_name">Name</label>
          <input type="text" id="item_name" v-model="item.name" />
        </div>

        <div>
          <label for="item_price">Price</label>
          <input type="number" id="item_price" v-model="item.price" />
        </div>

        <div>
          <label for="item_quantity">Quantity</label>
          <input type="number" id="item_quantity" v-model="item.quantity" />
        </div>

        <div>
          <label for="item_vat">VAT</label>
          <input type="number" id="item_vat" v-model="item.vat" />
        </div>

        <br />

        <div>
          <button type="button" @click="removeItem(index)">Remove</button>
        </div>
      </div>

      <div>
        <button type="button" @click="addItem">Add</button>
      </div>
    </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { InvoicesBody } from "@/server/api/invoices";
import { convertDateToUnixTime } from "../../functions/date";

const formData = ref<Omit<InvoicesBody, "id" | "date">>({
  payment_date: 0,
  company: {
    name: "",
    address: "",
    nip: "",
  },
  customer: {
    name: "",
    address: "",
    nip: "",
  },
  items: [
    {
      name: "",
      price: 0,
      quantity: 0,
      vat: 0,
    },
  ],
});

const addItem = () => {
  formData.value.items.push({
    name: "",
    price: 0,
    quantity: 0,
    vat: 0,
  });
};

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1);
};

const handleSubmit = async () => {
  await useFetch("/api/invoices/add", {
    method: "POST",
    body: JSON.stringify({
      ...formData.value,
      payment_date: convertDateToUnixTime(
        new Date(formData.value.payment_date).toString()
      ),
    }),
  });

  await navigateTo("/");
};
</script>
