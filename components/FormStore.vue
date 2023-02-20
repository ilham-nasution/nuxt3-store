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
        @input="
          $emit('update:storeName', ($event.target as HTMLInputElement).value)
        "
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
        @input="
          $emit(
            'update:storeAddress',
            ($event.target as HTMLInputElement).value
          )
        "
        type="text"
        class="input input-bordered w-full"
      />
    </div>
    <button type="submit" class="btn btn-block btn-primary my-3">Create</button>
  </form>
</template>

<script setup lang="ts">
interface Props {
  step: number;
  storeName: string;
  storeAddress: string;
}

defineProps<Props>();

defineEmits<{
  (e: "submitStore"): void;
  (e: "imgInput"): void;
  (e: "update:storeName"): void;
  (e: "update:storeAddress"): void;
}>();
</script>
