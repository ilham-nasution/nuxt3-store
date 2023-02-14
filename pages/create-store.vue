<template>
  <div class="container mx-auto">
    <div class="text-center">
      <ul class="steps">
        <li class="step step-primary">Create Store</li>
        <li class="step" :class="{ 'step-primary': step === 2 }">
          Create Product
        </li>
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
        <select v-model="brandSelected" class="select select-bordered">
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
const router = useRouter();

const shopId = ref("");
const storeName = ref("");
const storeAddress = ref("");
const storeImg = ref(null);
const productName = ref("");
const productDesc = ref("");
const productPrice = ref("");
const brandSelected = ref("");
const step = ref(1);
const brands = ref([]);

onMounted(async () => {
  const { data } = await client.from("brands").select("*");
  brands.value = data;
});

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

  const { data, error } = await client
    .from("shops")
    .insert([
      {
        image_url: image_url.data.publicUrl,
        address: storeAddress.value,
        name: storeName.value,
        user_id: user.value.id,
      },
    ])
    .select();

  shopId.value = data[0].id;

  if (error) {
    alert("error creating");
  }

  step.value = 2;
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-");

const submitProduct = async () => {
  await client.storage
    .from("products")
    .upload(storeImg.value.name, storeImg.value);

  const image_url = client.storage
    .from("products")
    .getPublicUrl(storeImg.value.name);

  const { error } = await client.from("products").insert([
    {
      image_url: image_url.data.publicUrl,
      title: productName.value,
      description: productDesc.value,
      price: productPrice.value,
      brand_id: brandSelected.value,
      slug: slugify(productName.value),
      shop_id: shopId.value,
    },
  ]);

  if (error) {
    alert("error creating");
  }

  router.push("/");
};
</script>
