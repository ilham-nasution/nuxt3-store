<template>
  <div class="container mx-auto">
    <h1 class="text-center text-5xl font-bold">Edit product</h1>

    <form @submit.prevent="submitProduct" class="my-5">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Product Image</span>
        </label>
        <div class="text-center">
          <div class="avatar">
            <div class="w-24 rounded">
              <img class="!object-scale-down" :src="productImgUrl" />
            </div>
          </div>
        </div>
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
      <button type="submit" class="btn btn-block btn-primary my-3">Edit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const client = useSupabaseClient();
const router = useRouter();
const route = useRoute();

const productImg = ref(null);
const productImgUrl = ref("");
const productName = ref("");
const productDesc = ref("");
const productPrice = ref("");
const brandSelected = ref("");
const brands = ref([]);

onMounted(async () => {
  const { data } = await client.from("brands").select("*");
  brands.value = data;

  const { data: dbProduct } = await client
    .from("products")
    .select("*")
    .eq("id", route.params.id);

  productName.value = dbProduct[0].title;
  productDesc.value = dbProduct[0].description;
  productPrice.value = dbProduct[0].price;
  brandSelected.value = dbProduct[0].brand_id;
  productImgUrl.value = dbProduct[0].image_url;
});

const imgInput = (e) => {
  productImg.value = e.target.files[0];
  productImgUrl.value = URL.createObjectURL(e.target.files[0]);
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s_-]+/g, "-");

const submitProduct = async () => {
  let image_url;
  if (productImg.value) {
    await client.storage
      .from("products")
      .upload(productImg.value.name, productImg.value);

    image_url = client.storage
      .from("products")
      .getPublicUrl(productImg.value.name);
  }

  const { error } = await client
    .from("products")
    .update({
      image_url: image_url ? image_url.data.publicUrl : productImgUrl.value,
      title: productName.value,
      description: productDesc.value,
      price: productPrice.value,
      brand_id: brandSelected.value,
      slug: slugify(productName.value),
    })
    .eq("id", route.params.id);

  if (error) {
    alert("error editing");
  } else {
    router.push(`/stores/${route.params.storename}`);
  }
};
</script>
