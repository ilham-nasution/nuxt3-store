<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="h-96">
      <img :src="img" alt="Shoes" class="object-cover" />
    </figure>
    <div class="card-body">
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
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  price: Number,
});
</script>
