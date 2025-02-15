import {
  actGetWishlist,
  clearWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist("ProductFullInfo"));
    return () => {
      promise.abort();
      dispatch(clearWishlistProductsFullInfo());
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id],
    isLiked: true,
    isAuthenticated: true,
  }));
  return { records, loading, error };
};

export default useWishlist;
