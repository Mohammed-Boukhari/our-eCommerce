import { TProduct } from "./product.types";

export type TOrdersItem = {
  id: number;
  userId: number;
  items: TProduct[];
  subtotal: number;
};
