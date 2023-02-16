<template>
  <div class="container mx-auto">
    <h1 class="text-center font-bold text-3xl mb-8">Store Management</h1>
    <div class="flex items-center gap-5 mb-5">
      <div class="avatar">
        <div
          class="w-24 rounded ring ring-primary ring-offset-base-100 ring-offset-2"
        >
          <img class="!object-scale-down" :src="store.image_url" />
        </div>
      </div>
      <div>
        <p class="text-xl">{{ store.name }}</p>
        <p>{{ store.address }}</p>
      </div>
    </div>
    <h1 class="font-bold text-xl mt-8">Product List</h1>
    <div class="grid grid-cols-2">
      <div v-for="product in products" class="flex items-center gap-5 my-4">
        <div class="avatar">
          <div class="w-24 rounded">
            <img class="!object-scale-down" :src="product.image_url" />
          </div>
        </div>
        <div>
          <p class="text-xl">{{ product.title }}</p>
          <p>{{ product.price }}</p>
          <button class="btn btn-outline mr-3">Edit</button>
          <button class="btn btn-outline btn-warning">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const client = useSupabaseClient();

const store = ref({});
const products = ref([]);

onMounted(async () => {
  const { data } = await client
    .from("shops")
    .select("*")
    .eq("slug", route.params.storename);

  store.value = data[0];

  const { data: dbProducts } = await client
    .from("products")
    .select("*")
    .eq("shop_id", store.value.id);

  products.value = dbProducts;
});
</script>
