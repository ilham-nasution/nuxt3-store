<template>
  <div class="container mx-auto">
    <div class="text-center">
      <ul class="steps">
        <li class="step step-primary">Create Store</li>
        <li class="step" :class="{ 'step-primary': step === 2 }">
          Create Product
        </li>
        <li class="step">Input Product</li>
      </ul>
    </div>
    <form v-show="step === 1" @submit.prevent="submitStore" class="my-5">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Store Image</span>
        </label>
        <input
          @change="imgInput"
          type="file"
          class="file-input file-input-bordered w-full"
        />
      </div>
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
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Store Address</span>
        </label>
        <input
          v-model="storeAddress"
          type="text"
          class="input input-bordered w-full"
        />
      </div>
      <button type="submit" class="btn btn-block btn-primary my-3">
        Create
      </button>
    </form>
    <form v-show="step === 2" @submit.prevent="submitProduct" class="my-5">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Image</span>
        </label>
        <input
          @change="imgInput"
          type="file"
          class="file-input file-input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Name</span>
        </label>
        <input
          v-model="productName"
          type="text"
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Brand</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Star Wars</option>
          <option>Harry Potter</option>
          <option>Lord of the Rings</option>
          <option>Planet of the Apes</option>
          <option>Star Trek</option>
        </select>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Description</span>
        </label>
        <textarea
          v-model="productDesc"
          type="text"
          class="textarea textarea-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Price</span>
        </label>
        <input
          v-model="productPrice"
          type="number"
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
const storeAddress = ref("");
const storeImg = ref(null);
const step = ref(1);

const imgInput = (e) => {
  storeImg.value = e.target.files[0];
};

const submitStore = async () => {
  await client.storage
    .from("avatars")
    .upload(storeImg.value.name, storeImg.value);

  const image_url = client.storage
    .from("avatars")
    .getPublicUrl(storeImg.value.name);

  const { error } = await client.from("shops").insert([
    {
      image_url: image_url.data.publicUrl,
      address: storeAddress.value,
      name: storeName.value,
      user_id: user.value.id,
    },
  ]);

  if (error) {
    alert("error creating");
  }

  step.value = 2;
};
</script>
