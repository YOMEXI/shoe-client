import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const checkout = () => {
  //

  const cart = JSON.parse(localStorage.getItem("cartItems") || "");
  const cartTotalQuantity = localStorage.getItem("cartTotalQuantity");

  //

  let c = cart.map((c: any) => {
    const { id, quantity } = c;
    return { id, quantity };
  });

  return <div> </div>;
};

export default checkout;
