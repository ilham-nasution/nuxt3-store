<template>
  <div class="container mx-auto">
    <div class="card lg:card-side bg-base-100 shadow-xl my-10">
      <figure
        class="w-full h-96"
        :class="{ 'animate-pulse bg-slate-200 h-96 w-96': isLoading }"
      >
        <img :src="product.image_url" :alt="product.title" />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h1
            class="text-4xl font-bold"
            :class="{ 'animate-pulse bg-slate-200 h-10 w-72': isLoading }"
          >
            {{ product.title }}
          </h1>
          <h1
            class="text-4xl font-bold"
            :class="{ 'animate-pulse bg-slate-200 h-10 w-48': isLoading }"
          >
            {{ isLoading ? "" : useCurrencyIDR(product.price) }}
          </h1>
        </div>
        <p :class="{ 'animate-pulse bg-slate-200 h-10 w-full': isLoading }">
          {{ product.description }}
        </p>
        <div class="card-actions justify-end">
          <button @click="handleCart" class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const cartCounter = useCartCounter();
const cartTotal = useCartTotal();

interface Product {
  brand_id: number;
  description: string;
  id: number;
  image_url: string;
  price: number;
  shop_id: number;
  slug: string;
  title: string;
}

const product = ref<Product>({
  brand_id: 0,
  description: "",
  id: 0,
  image_url: "",
  price: 0,
  shop_id: 0,
  slug: "",
  title: "",
});
const isLoading = ref<boolean>(true);

onMounted(async () => {
  const { data } = await client
    .from("products")
    .select("*")
    .eq("slug", route.params.product);

  product.value = data[0];
  isLoading.value = false;
});

const handleCart = async () => {
  cartCounter.value++;
  cartTotal.value = cartTotal.value + product.value.price;

  await useAsyncData("cart", async () => {
    await client.from("user_carts").upsert(
      {
        user_id: user.value.id,
        total_item: cartCounter.value,
        total_price: cartTotal.value,
      },
      { onConflict: "user_id" }
    );
    await client.from("user_cart_products").insert({
      user_id: user.value.id,
      product_id: product.value.id,
    });
  });
};
</script>
