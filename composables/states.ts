export const useCartCounter = () => useState<number>("counter", () => 0);
export const useCartTotal = () => useState<number>("price", () => 0);
