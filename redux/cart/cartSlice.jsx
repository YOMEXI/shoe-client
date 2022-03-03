import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cart = () => {
  if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  } else {
    return [];
  }
};

const putInCart = () => {};

const initialState = {
  cartItems: cart(),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex === -1) {
        let tempProductItem = {
          ...action.payload,
          cartQuantity: action.payload.quantity,
        };
        state.cartItems.push(tempProductItem);
        localStorage.setItem("cartItems", state.cartItems);

        toast.success("Product added to cart", {
          position: "top-right",
        });
      }

      if (existingIndex >= 0) {
        let c = JSON.parse(localStorage.getItem("cartItems"));

        c.map((c) => {
          if (c.id === action.payload.id) {
            if (
              c.size === action.payload.size &&
              c.color === action.payload.color
            ) {
              state.cartItems[existingIndex] = {
                ...state.cartItems[existingIndex],
                cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
              };
              toast.info("Increased product quantity", {
                position: "top-right",
              });

              return;
            } else {
              let tempProductItem = {
                ...action.payload,
                cartQuantity: action.payload.quantity,
              };
              state.cartItems.push(tempProductItem);

              toast.success("Product altered and added to cart", {
                position: "top-right",
              });
            }
          }
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "top-right",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "top-right",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "top-right",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );
      return state;
    },
  },
});

export const {
  addProducts,
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
