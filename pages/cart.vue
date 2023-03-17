<template>
  <div class="container">
    <div class="flex justify-between">
      <div>
        <h1 class="text-xl">Delivery Information</h1>
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
        <h1 class="text-xl">Schedule Delivery</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <TextInput label="Dates" />
            <TextInput label="Notes" />
          </div>
        </div>
        <h1 class="text-xl">Payment Method</h1>
        <div class="card shadow-xl">
          <div class="card-body">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Red pill</span>
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-red-500"
                  checked
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Blue pill</span>
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-blue-500"
                  checked
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-xl">Order Summary</h1>
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
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/vue/24/outline";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const store = useCartStore();
const { counter, total, products } = storeToRefs(store);
</script>
