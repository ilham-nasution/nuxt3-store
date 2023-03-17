<template>
  <div class="navbar bg-base-100 justify-between">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <NuxtLink @click="handleDropdown" to="/stores"
            >Store Management</NuxtLink
          >
        </li>
        <li v-if="user"><a @click="handleLogout">Logout</a></li>
      </ul>
    </div>
    <div class="lg:flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
        >Shoe Commerce</NuxtLink
      >
    </div>
    <div v-if="user" class="flex-none">
      <div class="dropdown dropdown-end hidden lg:flex">
        <label tabindex="0" class="btn btn-ghost">
          <div class="flex items-center">
            <div class="w-6 rounded-full">
              <UserIcon />
            </div>
            <span class="normal-case">{{ user?.email }}</span>
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NuxtLink to="/stores" @click="handleDropdown"
              >Store Management</NuxtLink
            >
          </li>
          <li><a @click="handleLogout">Logout</a></li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">{{ counter }}</span>
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow"
        >
          <div class="card-body">
            <span class="font-bold text-lg">Your Cart</span>
            <div
              v-for="product in products"
              :key="product.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div class="avatar mr-3">
                  <div class="w-10 rounded">
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
              </div>
              <span>{{ useCurrencyIDR(product.products.price) }}</span>
            </div>
            <div class="flex justify-between mt-5 font-bold text-xl">
              <span>Subtotal</span>
              <span>{{ useCurrencyIDR(total) }}</span>
            </div>
            <div class="card-actions">
              <NuxtLink to="/cart" class="btn btn-primary btn-block"
                >Checkout</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <NuxtLink to="/login" class="btn btn-ghost">Login</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  PlusSmallIcon,
  MinusSmallIcon,
} from "@heroicons/vue/24/outline";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const store = useCartStore();
const { counter, total, products } = storeToRefs(store);
const client = useSupabaseAuthClient();
const user = useSupabaseUser();

await useAsyncData("cart", async () => {
  const { data } = await client
    .from("user_carts")
    .select("*")
    .eq("user_id", user.value.id);

  counter.value = data[0].total_item;
  total.value = data[0].total_price;

  const { data: dbCartProducts } = await client
    .from("user_cart_products")
    .select(`*, products("*")`)
    .eq("user_id", user.value.id);

  products.value = dbCartProducts;
});

async function handleLogout() {
  document.activeElement.blur();
  const { error } = await client.auth.signOut();

  if (error) {
    alert(error);
  } else {
    await navigateTo("/");
  }
}

const handleDropdown = () => {
  document.activeElement.blur();
};
</script>
