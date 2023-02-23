<template>
  <div class="text-center">
    <h1 v-if="stores.length" class="text-3xl font-bold">Choose your store</h1>
    <div class="flex justify-center items-center">
      <NuxtLink
        v-for="store in stores"
        :to="'stores/' + store.slug"
        class="m-12"
      >
        <div class="avatar">
          <div
            class="w-36 rounded ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <nuxt-img
              format="webp"
              class="!object-scale-down hover:scale-125 hover:duration-700"
              :src="store.image_url"
              :alt="store.name"
            />
          </div>
        </div>
        <p class="text-xl mt-3">{{ store.name }}</p>
      </NuxtLink>
    </div>
    <h1 v-if="stores.length" class="text-3xl font-bold">Or</h1>
    <h1 v-if="!stores.length" class="text-3xl font-bold">
      You don't have any store
    </h1>
    <NuxtLink to="/create-store" class="btn btn-outline mt-5"
      >Create Store</NuxtLink
    >
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const stores = ref("");

await useAsyncData("stores", async () => {
  const { data } = await client
    .from("shops")
    .select("*")
    .eq("user_id", user.value.id);

  stores.value = data;
});
</script>
