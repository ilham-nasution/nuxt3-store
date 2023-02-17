<template>
  <input
    type="text"
    placeholder="Search"
    class="input input-bordered input-primary w-full border-x-0"
  />
  <select class="select select-ghost w-36 focus:outline-none">
    <option disabled selected>Brand</option>
    <option v-for="brand in brands">
      {{ brand.name }}
    </option>
  </select>
  <select class="select select-ghost w-36 focus:outline-none">
    <option disabled selected>Size</option>
    <option v-for="size in sizes">
      {{ size.size }}
    </option>
  </select>
  <select class="select select-ghost w-36 focus:outline-none">
    <option disabled selected>Color</option>
    <option v-for="color in colors">
      {{ color.name }}
    </option>
  </select>
  <div class="container mx-auto my-5">
    <div class="grid grid-cols-4 gap-4">
      <div v-for="product in products">
        <NuxtLink :to="'products/' + product.slug">
          <ProductCard
            :img="product.image_url"
            :title="product.title"
            :price="useCurrencyIDR(product.price)"
            :shop-img="product.shops?.image_url"
            :shop-name="product.shops?.name"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const client = useSupabaseClient();
const user = useSupabaseUser();
const products = ref([]);
const brands = ref([]);
const sizes = ref([]);
const colors = ref([]);

definePageMeta({
  middleware: "auth",
});

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

onMounted(async () => {
  const { data } = await client.from("products").select(`*, shops (*)`);
  products.value = data;
  const { data: DBbrands } = await client.from("brands").select("name");
  brands.value = DBbrands;
  const { data: DBcolors } = await client.from("colors").select("name");
  colors.value = DBcolors;
  const { data: DBsizes } = await client.from("sizes").select("size");
  sizes.value = DBsizes;
});
</script>
