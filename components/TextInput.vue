<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  placeholder?: string;
}

defineProps<Props>();
</script>
