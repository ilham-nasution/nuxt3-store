<template>
  <form
    v-show="step === 2"
    @submit.prevent="$emit('submitProduct')"
    class="my-5"
  >
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Product Image</span>
      </label>
      <input
        @change="$emit('imgInput', $event)"
        type="file"
        class="file-input file-input-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Product Name</span>
      </label>
      <input
        :value="productName"
        @input="$emit('update:productName', $event.target.value)"
        type="text"
        class="input input-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Product Brand</span>
      </label>
      <select
        :value="productBrand"
        @change="$emit('update:productBrand', $event.target.value)"
        class="select select-bordered"
      >
        <option v-for="brand in brands" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Product Description</span>
      </label>
      <textarea
        :value="productDesc"
        @input="$emit('update:productDesc', $event.target.value)"
        type="text"
        class="textarea textarea-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Product Price</span>
      </label>
      <input
        :value="productPrice"
        @input="$emit('update:productPrice', $event.target.value)"
        type="number"
        class="input input-bordered w-full"
      />
    </div>
    <button type="submit" class="btn btn-block btn-primary my-3">Create</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  step: Number,
  productName: String,
  productDesc: String,
  productPrice: String,
  productBrand: String,
});

defineEmits([
  "submitProduct",
  "imgInput",
  "update:productName",
  "update:productDesc",
  "update:productPrice",
  "update:productBrand",
]);

const brands = ref([]);

const client = useSupabaseClient();

onMounted(async () => {
  const { data } = await client.from("brands").select("*");
  brands.value = data;
});
</script>
