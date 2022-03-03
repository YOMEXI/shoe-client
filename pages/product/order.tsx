import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const order = () => {
  const router = useRouter();
  const [paypal, setPaypal] = useState<any>("");
  const [orderId, setOrderId] = useState<any>("");
  const [order, setOrder] = useState<any>("");

  const { clientId } = paypal;

  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;

  useEffect(() => {
    const clientId = async () => {
      const res = await axios.get(`/api/order/paypal`);
      setPaypal(res.data);
    };

    clientId();
  }, [router]);

  const cartTotalAmount = localStorage.getItem("cartTotalAmount");

  const initialOptions = {
    "client-id": clientId,
    currency: "USD",
  };
  //

  useEffect(() => {
    const getOrder: any = async () => {
      const { data } = await axios.get(`/api/order/`);
      setOrder(data);
      console.log(data);
    };

    getOrder();
  }, [router]);

  const createOrder: any = async () => {
    const res: any = await axios.post(`/api/order/orderId`, {
      cartTotalAmount,
    });
    setOrderId(res.data.orderId);
    return res.data.orderId;
  };

  const onApprove: any = async (orderId: any) => {
    const { data } = await axios.post(`/api/order/onApprove/${orderId}`);

    if (data) {
      toast.success(data.msg);

      router.push("/product/order");
    }
  };
  return (
    order &&
    order?.map((order: any, i: any) => (
      <div className="order-container" key={i}>
        <div className="order-box">
          <div className="order">
            <div className="orderId">
              <span>OrderId :{order.orderId}</span>
            </div>
            <div className="product">
              <span>{order.paymentResponse}</span>
            </div>
            <div className="product">
              <span>Delievery status: {order.status}</span>
            </div>
            <div className="delete-order">
              <span>
                {user?.user?.role === "admin" && (
                  <i className="fas fa-trash order-trash"></i>
                )}
              </span>
            </div>
          </div>
          <div className="checkout">
            {clientId && (
              <>
                <div className="paypal">
                  <div className="paypals">
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={() => onApprove(order.allOrders.orderId)}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    ))
  );
};

export default order;
