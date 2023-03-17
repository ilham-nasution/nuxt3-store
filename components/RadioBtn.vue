<template>
  <div class="form-control">
    <label class="label cursor-pointer gap-4">
      <span class="label-text">{{ label }}</span>
      <input
        type="radio"
        name="radio-10"
        class="radio checked:bg-black"
        :checked="checked"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  checked?: boolean;
}

defineProps<Props>();
</script>
