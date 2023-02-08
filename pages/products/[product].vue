<template>
  <Navbar />
  <div class="container mx-auto my-5">
    <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure class="w-full h-96">
        <img :src="product.image_url" alt="Album" />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h1 class="text-4xl font-bold">{{ product.title }}</h1>
          <h1 class="text-4xl font-bold">
            {{
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(product.price)
            }}
          </h1>
        </div>
        <p>{{ product.description }}</p>
        <p>color</p>
        <p>size</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const route = useRoute();
const product = ref({});

onMounted(async () => {
  const { data } = await client
    .from("products")
    .select("*")
    .eq("slug", route.params.product);
  product.value = data[0];
});
</script>
