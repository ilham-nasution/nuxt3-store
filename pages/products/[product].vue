<template>
  <div class="container mx-auto">
    <div class="card lg:card-side bg-base-100 shadow-xl my-10">
      <figure class="w-full h-96">
        <img :src="product.image_url" :alt="product.title" />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h1 class="text-4xl font-bold">{{ product.title }}</h1>
          <h1 class="text-4xl font-bold">
            {{ useCurrencyIDR(product.price) }}
          </h1>
        </div>
        <p>{{ product.description }}</p>
        <div class="card-actions justify-end">
          <button @click="handleCart" class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const product = ref({});
const cartCounter = useCartCounter();
const cartTotal = useCartTotal();

onMounted(async () => {
  const { data } = await client
    .from("products")
    .select("*")
    .eq("slug", route.params.product);
  product.value = data[0];
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
