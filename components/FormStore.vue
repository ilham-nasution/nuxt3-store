<template>
  <form v-show="step === 1" @submit.prevent="$emit('submitStore')" class="my-5">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Store Image</span>
      </label>
      <input
        @change="$emit('imgInput', $event)"
        type="file"
        class="file-input file-input-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Store Name</span>
      </label>
      <input
        :value="storeName"
        @input="$emit('update:storeName', $event.target.value)"
        type="text"
        class="input input-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Store Address</span>
      </label>
      <input
        :value="storeAddress"
        @input="$emit('update:storeAddress', $event.target.value)"
        type="text"
        class="input input-bordered w-full"
      />
    </div>
    <button type="submit" class="btn btn-block btn-primary my-3">Create</button>
  </form>
</template>

<script setup>
defineProps({
  step: Number,
  storeName: String,
  storeAddress: String,
});

defineEmits([
  "submitStore",
  "imgInput",
  "update:storeName",
  "update:storeAddress",
]);
</script>
