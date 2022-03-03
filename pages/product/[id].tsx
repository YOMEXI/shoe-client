import axios from "axios";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { productI } from "../../components/dto/product";
import { addProducts, addToCart } from "../../redux/cart/cartSlice";

const singleProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const id = router.query.id;

  const [product, setProduct] = useState<any>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`api/product/${id}`);
        console.log(data);
        setProduct(data);
      } catch (error) {}
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = (product: productI) => {
    dispatch(addToCart({ ...product, quantity, color, size }));
  };

  return (
    product && (
      <div className="single-product">
        <div className="single-product_left">
          <img src={product?.imgUrl} alt="" />
        </div>
        <div className="single-product_right">
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <p>$ {product?.price}</p>

          <div className="filters">
            <div className="filter-box">
              <div className="size">
                <span> Size</span>{" "}
              </div>
              <div className="filter-param">
                {product?.size.map((s: string, i: any) => (
                  <div key={i}>
                    <span> {s} </span>{" "}
                    <input
                      type="checkbox"
                      onClick={(e: any) => setSize(e.target.value)}
                      value={s}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-box">
              <div className="color">
                <span> Color</span>{" "}
              </div>
              <div className="filter-param">
                {product?.color.map((c: string, i: any) => (
                  <div key={i}>
                    <span> {c} </span>{" "}
                    <input
                      type="checkbox"
                      onClick={(e: any) => setColor(e.target.value)}
                      value={c}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="add-to-cart">
            <div className="units">
              <div className="unit">
                <i
                  className="fas fa-plus"
                  onClick={() => handleQuantity("inc")}
                ></i>
              </div>
              <div className="unit-num">{quantity}</div>
              <div className="unit">
                <i
                  className="fas fa-minus"
                  onClick={() => handleQuantity("dec")}
                ></i>
              </div>
            </div>
            <div className="cart" onClick={() => handleAddToCart(product)}>
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default singleProduct;
