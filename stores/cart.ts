import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const client = useSupabaseAuthClient();

  const counter = ref<number>(0);
  const total = ref<number>(0);
  const products = ref([]);

  const incrementCounter = () => counter.value++;
  const sumTotal = (price: number) => (total.value = total.value + price);
  const addProduct = async (userId: string, productId: number) => {
    const { data } = await client
      .from("user_cart_products")
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select(`*, products("*")`);

    products.value.push(data[0]);
  };

  return { counter, total, products, addProduct, incrementCounter, sumTotal };
});
