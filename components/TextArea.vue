<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  placeholder?: string;
}

defineProps<Props>();
</script>
