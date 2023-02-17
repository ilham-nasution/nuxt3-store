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
    <FormStore
      :step="step"
      v-model:storeName="storeName"
      v-model:storeAddress="storeAddress"
      @submitStore="submitStore"
      @imgInput="imgInput"
    />
    <FormProduct
      :step="step"
      v-model:productName="productName"
      v-model:productDesc="productDesc"
      v-model:productPrice="productPrice"
      v-model:productBrand="productBrand"
      @submitProduct="submitProduct"
      @imgInput="imgInput"
    />
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
const productBrand = ref("");
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

  const { data, error } = await client
    .from("shops")
    .insert([
      {
        image_url: image_url.data.publicUrl,
        address: storeAddress.value,
        name: storeName.value,
        user_id: user.value.id,
        slug: useSlugify(storeName.value),
      },
    ])
    .select();

  shopId.value = data[0].id;

  if (error) {
    alert("error creating");
  }

  step.value = 2;
};

const submitProduct = async () => {
  console.log("submitting product");
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
      brand_id: productBrand.value,
      slug: useSlugify(productName.value),
      shop_id: shopId.value,
    },
  ]);

  if (error) {
    alert("error creating");
  }

  router.push("/");
};
</script>
