<template>
  <div class="container mx-auto mb-10">
    <div class="flex justify-between gap-3">
      <div class="grow">
        <h1 class="text-xl mb-3 font-bold">Delivery Information</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <div class="grid grid-cols-2 gap-3">
              <TextInput label="Name" />
              <TextInput label="Mobile Number" />
              <TextInput label="Email" />
              <TextInput label="City" />
              <TextArea label="Address" class="col-span-2" />
            </div>
          </div>
        </div>
        <h1 class="text-xl my-3 font-bold">Schedule Delivery</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <label class="label-text">Date</label>
            <VueDatePicker
              v-model="date"
              :min-date="new Date()"
              :enable-time-picker="false"
            ></VueDatePicker>
            <TextInput label="Notes" />
          </div>
        </div>
        <h1 class="text-xl my-3 font-bold">Payment Method</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <div class="flex gap-5">
              <RadioBtn label="Credit Card" checked="true" />
              <RadioBtn label="QRIS" />
              <RadioBtn label="Cash On Delivery" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-xl mb-3 font-bold">Order Summary</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <div
              v-for="product in products"
              :key="product.id"
              class="flex items-center justify-between gap-7"
            >
              <div class="flex items-center">
                <div class="avatar mr-3">
                  <div class="w-20 rounded">
                    <nuxt-img
                      format="webp"
                      class="!object-scale-down"
                      :src="product.products.image_url"
                      :alt="product.products.title"
                    />
                  </div>
                </div>
                <div>
                  <p>{{ product.products.title }}</p>
                  <p>{{ useCurrencyIDR(product.products.price) }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <button class="btn btn-circle btn-outline btn-xs">
                  <MinusSmallIcon class="w-4" />
                </button>
                <span class="mx-3">{{ product.quantity }}</span>
                <button class="btn btn-circle btn-outline btn-xs">
                  <PlusSmallIcon class="w-4" />
                </button>
              </div>
            </div>
            <div class="border-y-2 py-3">
              <div class="flex justify-between">
                <h1>Subtotal</h1>
                <h1>{{ useCurrencyIDR(total) }}</h1>
              </div>
              <h1>Shipping</h1>
            </div>
            <h1>Total</h1>
            <button class="btn btn-primary btn-block">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/vue/24/outline";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const store = useCartStore();
const { counter, total, products } = storeToRefs(store);
const date = ref("");
</script>
