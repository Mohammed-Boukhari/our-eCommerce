import { Button } from "react-bootstrap";
import { TProduct } from "@types";
type TCartSubtotalProps = {
  products: TProduct[];
  userAccessToken: string | null | undefined;
};

import styles from "./style.module.css";

const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: TCartSubtotalProps) => {
  const subtotalPrice = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;

    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  return (
    <>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotalPrice.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button variant="info" style={{ color: "white" }}>
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
