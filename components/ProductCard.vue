<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="h-80">
      <nuxt-img format="webp" :src="img" alt="Shoes" sizes="sm:100vw md:50vw lg:400px" />
    </figure>
    <div class="card-body">
      <div class="flex items-center mb-3">
        <div class="avatar mr-3">
          <div
            class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <nuxt-img
              format="webp"
              :src="shopImg"
              alt="logo"
              class="!object-scale-down"
            />
          </div>
        </div>
        <span>{{ shopName }}</span>
      </div>
      <p class="font-bold truncate">{{ title }}</p>
      <p>
        {{ price }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  img: string;
  title: string;
  price: string;
  shopName: string;
  shopImg: string;
}

defineProps<Props>();
</script>
