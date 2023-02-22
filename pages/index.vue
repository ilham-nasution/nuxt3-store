<template>
  <input
    v-model="keyword"
    @keyup.enter="handleSearch"
    type="text"
    placeholder="Search by name"
    class="input input-bordered input-primary w-full border-x-0"
  />
  <select
    @change="handleFilterBrand"
    class="select select-ghost w-36 focus:outline-none"
    v-model="brandSelected"
  >
    <option disabled selected value="null">Brand</option>
    <option>All</option>
    <option v-for="brand in brands" :value="brand.id">
      {{ brand.name }}
    </option>
  </select>
  <select class="select select-ghost w-36 focus:outline-none">
    <option disabled selected>Size</option>
    <option>All</option>
    <option v-for="size in sizes">
      {{ size.size }}
    </option>
  </select>
  <select class="select select-ghost w-36 focus:outline-none">
    <option disabled selected>Color</option>
    <option>All</option>
    <option v-for="color in colors">
      {{ color.name }}
    </option>
  </select>
  <div class="container mx-auto my-5">
    <div class="grid grid-cols-4 gap-4">
      <TransitionGroup name="product">
        <div v-for="product in products" :key="product.id">
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
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Brand {
  id: Number;
  name: String;
}

interface Size {
  size: Number;
}

interface Color {
  name: String;
}

interface Product {
  id: number;
  slug: string;
  image_url: string;
  title: string;
  price: string;
  brand_id: number;
  shops: { image_url: string; name: string };
}

const client = useSupabaseClient();
const user = useSupabaseUser();
const products = ref<Product[] | null>([]);
const brands = ref<Brand[] | null>([]);
const sizes = ref<Size[] | null>([]);
const colors = ref<Color[] | null>([]);
const brandSelected = ref(null);
const keyword = ref<string>("");

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
  const { data: DBbrands } = await client.from("brands").select("*");
  brands.value = DBbrands;
  const { data: DBcolors } = await client.from("colors").select("*");
  colors.value = DBcolors;
  const { data: DBsizes } = await client.from("sizes").select("*");
  sizes.value = DBsizes;
});

const handleFilterBrand = async () => {
  if (brandSelected.value !== "All") {
    const { data } = await client
      .from("products")
      .select(`*, shops (*)`)
      .eq("brand_id", brandSelected.value);
    products.value = data;
  } else {
    const { data } = await client.from("products").select(`*, shops (*)`);
    products.value = data;
  }
};

const handleSearch = async () => {
  const { data } = await client
    .from("products")
    .select(`*, shops (*)`)
    .ilike("title", `%${keyword.value}%`);
  products.value = data;
};
</script>

<style scoped>
.product-move,
.product-enter-active,
.product-leave-active {
  transition: all 0.5s ease;
}

.product-enter-from,
.product-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.product-leave-active {
  position: absolute;
}
</style>
