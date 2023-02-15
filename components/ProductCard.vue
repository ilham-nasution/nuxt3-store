<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="h-96">
      <img :src="img" alt="Shoes" class="object-cover" />
    </figure>
    <div class="card-body">
      <div class="flex items-center mb-3">
        <div class="avatar mr-3">
          <div
            class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
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
