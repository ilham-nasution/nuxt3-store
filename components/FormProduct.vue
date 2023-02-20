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
        @input="
          $emit('update:productName', ($event.target as HTMLInputElement).value)
        "
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
        @change="
          $emit(
            'update:productBrand',
            ($event.target as HTMLInputElement).value
          )
        "
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
        @input="
          $emit('update:productDesc', ($event.target as HTMLInputElement).value)
        "
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
        @input="
          $emit(
            'update:productPrice',
            ($event.target as HTMLInputElement).value
          )
        "
        type="number"
        class="input input-bordered w-full"
      />
    </div>
    <button type="submit" class="btn btn-block btn-primary my-3">Create</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  step: number;
  productName: string;
  productDesc: string;
  productPrice: string;
  productBrand: string;
}

defineProps<Props>();

defineEmits<{
  (e: "submitStore"): void;
  (e: "imgInput"): void;
  (e: "update:productName"): void;
  (e: "update:productDesc"): void;
  (e: "update:productPrice"): void;
  (e: "update:productBrand"): void;
}>();

interface brand {
  id: number;
  name: string;
}

const brands = ref<brand[] | null>([]);

const client = useSupabaseClient();

onMounted(async () => {
  const { data } = await client.from("brands").select("*");
  brands.value = data;
});
</script>
