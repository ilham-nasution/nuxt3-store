<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl md:text-5xl font-bold">Create product</h1>

    <form @submit.prevent="submitProduct" class="my-5">
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
const router = useRouter();
const route = useRoute();

const shopId = ref("");
const storeImg = ref(null);
const productName = ref("");
const productDesc = ref("");
const productPrice = ref("");
const brandSelected = ref("");
const brands = ref([]);

onMounted(async () => {
  const { data } = await client.from("brands").select("*");
  brands.value = data;

  const { data: dbShop } = await client
    .from("shops")
    .select("id")
    .eq("slug", route.params.storename);

  shopId.value = dbShop[0].id;
});

const imgInput = (e) => {
  storeImg.value = e.target.files[0];
};

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
      slug: useSlugify(productName.value),
      shop_id: shopId.value,
    },
  ]);

  if (error) {
    alert("error creating");
  } else {
    router.push("/");
  }
};
</script>
