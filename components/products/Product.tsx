import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { productI } from "../dto/product";
import Category from "./cartegories";

const Products = ({ cat, filters, sort }: any) => {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<any[]>([]);

  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const allProducts = async () => {
      try {
        const { data } = await axios.get(
          cat
            ? `/api/product?categories=${cat}&page=${pageIndex}`
            : `/api/product?page=${pageIndex}`,
          { withCredentials: true }
        );

        setProducts(data);
      } catch (error) {}
    };
    allProducts();
  }, [cat, pageIndex]);

  useEffect(() => {
    cat &&
      setfilteredProducts(
        products.filter((item: any) =>
          Object.entries({ ...filters }).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((prev: any) =>
        [...prev].sort((b, a) => a.createdAt - b.createdAt)
      );
    }
    if (sort === "ASC") {
      setfilteredProducts((prev: any) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    if (sort === "DESC") {
      setfilteredProducts((prev: any) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const prev = (num: number) => {
    if (num < 1) {
      return setPageIndex(0);
    } else {
      setPageIndex(num - 1);
    }
  };
  const next = (num: number) => {
    if (num < 1) {
      return setPageIndex(0);
    } else {
      setPageIndex(num - 1);
    }
  };

  return (
    <section className="products" id="products">
      <div className="sub-heading">Our products</div>
      <div className="heading">popular products</div>

      <div className="box-container">
        {cat
          ? filteredProducts?.map((product: productI) => (
              <div className="box" key={product.id}>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-eye"></a>
                <img
                  src={product.imgUrl}
                  alt=""
                  onClick={() => router.push(`/product/${product.id}`)}
                />
                <p className="food-details">
                  {/* <h3>Tasty</h3> */}

                  <span>$20</span>
                </p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>

                <a href="" className="btn">
                  Add to cart
                </a>
              </div>
            ))
          : products?.map((product: productI) => (
              <div className="box" key={product.id}>
                <a href="#" className="fas fa-heart"></a>
                <a href="#" className="fas fa-eye"></a>
                <img
                  src={product.imgUrl}
                  alt=""
                  onClick={() => router.push(`/product/${product.id}`)}
                />
                <p className="food-details">
                  {/* <h3>Tasty</h3> */}

                  <span>$ {product.price}</span>
                </p>
                {/* <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div> */}

                <a href="" className="btn">
                  {product.title}
                </a>
              </div>
            ))}

        {/*  */}
      </div>
      <div className="paginate">
        <button onClick={() => prev(pageIndex)}>Prev</button>
        {products.length === 3 && (
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        )}
        {filteredProducts.length === 3 && (
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        )}
      </div>
    </section>
  );
};

export default Products;
