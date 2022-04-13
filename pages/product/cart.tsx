import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux/cart/cartSlice";
import { RootState } from "../../redux/store";
import { ToastSuccess } from "../../utils/alerts";

const Cart = () => {
  const [loading, setloading] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const { cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  const decreaseInCart = (product: any) => {
    dispatch(decreaseCart(product));
  };

  const RemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    dispatch(getTotals(""));
  }, [cart, dispatch]);

  const carts = JSON.parse(localStorage.getItem("cartItems") || "");

  const TotalAmount = localStorage.getItem("cartTotalAmount");

  let c = carts.map((c: any) => {
    const { id, quantity } = c;
    return { id, quantity };
  });

  const createOrder = async () => {
    setloading(true);
    const { data } = await axios.post(`/api/order/create`, {
      c,
      cartTotalAmount: TotalAmount,
    });

    if (data) {
      setloading(false);
      ToastSuccess("order created");
      setTimeout(() => {
        Router.push("/product/order");
      }, 2000);
    } else {
      toast.error("Order creatiom errr");
    }
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart">
          <div className="products" key={cart.id}>
            {cart &&
              cart?.map((cart: any, i: any) => (
                <div className="product" key={i}>
                  <img src={cart.imgUrl} alt="" />
                  <div className="product-info">
                    <h3 className="product-name"> {cart.title} </h3>
                    <h3 className="product-details">
                      <span>color: {cart.color}</span>{" "}
                      <span>size: {cart.size}</span>
                    </h3>
                    <h2 className="product-price">$ {cart.price}</h2>
                    <h2 className="product-offer">
                      <div>
                        <div className="add-to-cart">
                          <div className="unit">
                            <div className="unit-num">{cart.cartQuantity}</div>
                            <div className="unit">
                              <i
                                className="fas fa-minus"
                                onClick={() => decreaseInCart(cart)}
                              ></i>
                            </div>
                            <div className="productRemove">
                              <i
                                className="fas fa-trash"
                                onClick={() => RemoveFromCart(cart)}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </h2>
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-total">
            <p>
              <span>Total Price</span>
              <span>$ {cartTotalAmount}</span>
            </p>
            <p>
              <span>Number of Items</span>
              <span> {cartTotalQuantity} </span>
            </p>

            <a onClick={createOrder} style={{ cursor: "pointer" }}>
              {loading ? "Creating Order" : "Create Order"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
