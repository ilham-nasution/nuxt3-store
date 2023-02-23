<template>
  <div class="container mx-auto mb-5">
    <h1 class="text-center font-bold text-3xl mb-8">Store Management</h1>
    <div class="flex items-center gap-5 mb-10">
      <div class="avatar">
        <div
          class="w-24 rounded ring ring-primary ring-offset-base-100 ring-offset-2"
        >
          <nuxt-img
            format="webp"
            class="!object-scale-down"
            :src="store.image_url"
            :alt="store.name"
          />
        </div>
      </div>
      <div>
        <p class="text-xl">{{ store.name }}</p>
        <p>{{ store.address }}</p>
      </div>
    </div>
    <div class="flex justify-between items-center border-b-2 py-3">
      <h1 class="font-bold text-xl">Product List</h1>
      <NuxtLink :to="'/stores/' + store.slug + '/products/create'" class="btn"
        >Add Product</NuxtLink
      >
    </div>
    <div class="grid grid-cols-2">
      <TransitionGroup name="product">
        <div
          v-for="product in products"
          :key="product.id"
          class="flex items-center gap-5 my-4"
        >
          <div class="avatar">
            <div class="w-24 rounded">
              <nuxt-img
                format="webp"
                class="!object-scale-down"
                :src="product.image_url"
                :alt="product.title"
              />
            </div>
          </div>
          <div>
            <p class="text-xl">{{ product.title }}</p>
            <p class="mb-2">{{ useCurrencyIDR(product.price) }}</p>
            <NuxtLink
              :to="
                '/stores/' + store.slug + '/products/' + product.id + '/edit'
              "
              class="btn btn-outline mr-3"
              >Edit</NuxtLink
            >
            <button
              @click="handleDeleteProduct(product.id, $event)"
              class="btn btn-outline btn-warning"
            >
              Delete
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const client = useSupabaseClient();

const store = ref({});
const products = ref([]);

await useAsyncData("shop", async () => {
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

const handleDeleteProduct = async (id) => {
  const { error } = await client.from("products").delete().eq("id", id);

  if (error) {
    alert("error deleting");
  } else {
    const filteredproducts = products.value.filter((element) => {
      return element.id != id;
    });
    products.value = filteredproducts;
  }
};
</script>

<style>
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
