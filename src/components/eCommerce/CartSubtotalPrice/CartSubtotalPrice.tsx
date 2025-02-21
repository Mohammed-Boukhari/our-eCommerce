import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { Button, Modal } from "react-bootstrap";
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
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const subtotalPrice = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;

    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const placeOrderHandler = () => {
    dispatch(actPlaceOrder(subtotalPrice));
  };

  return (
    <>
      <Modal show={showModal} onHide={() => modalHandler()} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to place order with Subtotal:
            {` ${subtotalPrice.toFixed(2)} EGP`}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => modalHandler()}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => placeOrderHandler()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotalPrice.toFixed(2)} EGP</span>
      </div>

      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={() => modalHandler()}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
