<template>
  <div>
    <Head>
      <Title>Shoe Commerce | {{ product.title }}</Title>
    </Head>
    <div class="container mx-auto">
      <div class="card lg:card-side bg-base-100 shadow-xl my-10">
        <figure
          class="w-full h-96"
          :class="{ 'animate-pulse bg-slate-200 h-96 w-96': isLoading }"
        >
          <nuxt-img
            v-if="!isLoading"
            format="webp"
            :src="product.image_url"
            :alt="product.title"
          />
        </figure>
        <div class="card-body">
          <div class="flex flex-col md:flex-row md:justify-between">
            <h1
              class="text-2xl lg:text-4xl font-bold"
              :class="{ 'animate-pulse bg-slate-200 h-10 w-72': isLoading }"
            >
              {{ product.title }}
            </h1>
            <h1
              class="text-2xl lg:text-4xl font-bold"
              :class="{ 'animate-pulse bg-slate-200 h-10 w-48': isLoading }"
            >
              {{ isLoading ? "" : useCurrencyIDR(product.price) }}
            </h1>
          </div>
          <p :class="{ 'animate-pulse bg-slate-200 h-10 w-full': isLoading }">
            {{ product.description }}
          </p>
          <div class="card-actions justify-end">
            <button
              @click="handleCart"
              class="btn btn-primary"
              :class="{
                'btn-disabled': inCart || isBtnLoading,
                loading: isBtnLoading,
              }"
            >
              {{ inCart ? "Already in cart" : "Buy" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const store = useCartStore();
const { addProduct, incrementCounter, sumTotal } = store;
const { counter, total, products } = storeToRefs(store);

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
const inCart = ref<boolean>(false);
const isBtnLoading = ref<boolean>(false);

onMounted(async () => {
  const { data } = await client
    .from("products")
    .select("*")
    .eq("slug", route.params.product);

  product.value = data[0];
  products.value.map((item) => {
    if (item.product_id === product.value.id) {
      inCart.value = true;
    }
  });
  isLoading.value = false;
});

const handleCart = async () => {
  if (!user.value) {
    await navigateTo("/login");
  } else {
    isBtnLoading.value = true;
    incrementCounter();
    sumTotal(product.value.price);

    await useAsyncData("cart", async () => {
      await client.from("user_carts").upsert(
        {
          user_id: user.value.id,
          total_item: counter.value,
          total_price: total.value,
        },
        { onConflict: "user_id" }
      );
      addProduct(user.value.id, product.value.id);
    });
    isBtnLoading.value = false;
    inCart.value = true;
  }
};
</script>
