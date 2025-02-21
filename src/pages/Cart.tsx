import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    products,
    changeQuantityHandler,
    removeItemHandler,
    loading,
    error,
    userAccessToken,
  } = useCart();

  return (
    <>
      <Heading title={"Cart"} />
      <Loading status={loading} error={error} type="cart">
        <>
          {products.length === 0 ? (
            <LottieHandler type={"empty"} message="Your cart is empty" />
          ) : (
            <>
              <CartItemList
                products={products}
                changeQuantityHandler={changeQuantityHandler}
                removeItemHandler={removeItemHandler}
              />
              <CartSubtotalPrice
                products={products}
                userAccessToken={userAccessToken}
              />
            </>
          )}
        </>
      </Loading>
    </>
  );
};

export default Cart;
