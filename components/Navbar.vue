<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
        >Shoe Commerce</NuxtLink
      >
    </div>
    <div v-if="user" class="flex-none">
      <div class="dropdown dropdown-end">
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
            <NuxtLink to="/stores">Store Management</NuxtLink>
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
            <span class="badge badge-sm indicator-item">{{ cartCounter }}</span>
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div class="card-body">
            <span class="font-bold text-lg">{{ cartCounter }} Items</span>
            <span class="text-info"
              >Subtotal: {{ useCurrencyIDR(cartTotal) }}</span
            >
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
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
import { UserIcon } from "@heroicons/vue/24/outline";

const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const cartCounter = useCartCounter();
const cartTotal = useCartTotal();

await useAsyncData("cart", async () => {
  const { data } = await client
    .from("user_carts")
    .select("*")
    .eq("user_id", user.value.id);

  cartCounter.value = data[0].total_item;
  cartTotal.value = data[0].total_price;
});

async function handleLogout() {
  const { error } = await client.auth.signOut();

  if (error) {
    alert(error);
  } else {
    await navigateTo("/");
  }
}
</script>
