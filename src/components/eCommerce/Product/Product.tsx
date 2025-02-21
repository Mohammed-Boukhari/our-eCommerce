import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";

import { Button, Modal, Spinner } from "react-bootstrap";
import { TProduct } from "@types";
// FIXME: import svg element for product
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import styles from "./style.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";

const { maximumNotice, wishListBTN } = styles;

const Product = memo(
  ({
    title,
    price,
    img,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [isBTNDisabled, setIsBTNDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

    useEffect(() => {
      if (!isBTNDisabled) {
        return;
      }

      setIsBTNDisabled(true);
      const debounce = setTimeout(() => {
        setIsBTNDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBTNDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBTNDisabled(true);
    };

    const LikeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo title={title} img={img} price={price}>
          <div className={wishListBTN} onClick={LikeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            onClick={addToCartHandler}
            variant="info"
            style={{ color: "white", width: "100%" }}
            disabled={isBTNDisabled || quantityReachedToMax}
          >
            {isBTNDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
