import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "../../components/ProductCard.vue";

test("Product Card", async () => {
  expect(ProductCard).toBeTruthy();

  const wrapper = mount(ProductCard, {
    props: {
      title: "Air Jordan",
    },
  });

  expect(wrapper.get(".truncate").text()).toContain("Air Jordan");
});
