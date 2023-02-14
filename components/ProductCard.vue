<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="h-96">
      <img :src="img" alt="Shoes" class="object-cover" />
    </figure>
    <div class="card-body">
      <div class="flex items-center">
        <div class="avatar mr-3">
          <div class="w-10 rounded-full">
            <img :src="shopImg" />
          </div>
        </div>
        <span>{{ shopName }}</span>
      </div>
      <h2 class="card-title">{{ title }}</h2>
      <p>
        {{
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(price)
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  price: Number,
  shopName: String,
  shopImg: String,
});
</script>
