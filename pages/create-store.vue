<template>
  <div class="container mx-auto">
    <div class="text-center">
      <ul class="steps">
        <li class="step step-primary">Create Store</li>
        <li class="step">Create Product</li>
        <li class="step">Input Product</li>
      </ul>
    </div>
    <form class="my-5">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Store Name</span>
        </label>
        <input
          v-model="storeName"
          type="text"
          class="input input-bordered w-full"
        />
      </div>
      <button type="submit" class="btn btn-block btn-primary my-3">
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const client = useSupabaseClient();
const user = useSupabaseUser();
const storeName = ref("");

// const submitStore = async () => {
//   const { data, error } = await client
//     .from("shops")
//     .insert([{ name: storeName.value, user_id: user.value.id }]);
// };
</script>
