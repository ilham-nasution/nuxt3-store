<template>
  <Navbar />
  <div class="container mx-auto my-5">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="product in products">
        <NuxtLink :to="'products/' + product.slug">
          <ProductCard
            :img="product.image_url"
            :title="product.title"
            :price="product.price"
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

definePageMeta({
  middleware: "auth",
});

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

onMounted(async () => {
  const { data } = await client.from("products").select("*");
  products.value = data;
});
</script>
