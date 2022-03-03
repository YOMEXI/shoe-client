import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { productI } from "../../../components/dto/product";

const Search = () => {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);

  const [pageIndex, setPageIndex] = useState(0);
  const searchText = router.query.search;

  useEffect(() => {
    const Search = async () => {
      try {
        const { data } = await axios.post(`/api/product/search/${searchText}`);

        setProducts(data);
      } catch (error) {}
    };
    Search();
  }, [router, pageIndex]);

  const prev = (num: number) => {
    if (num < 1) {
      return setPageIndex(0);
    } else {
      setPageIndex(num - 1);
    }
  };

  return (
    <section className="products" id="products">
      <div className="sub-heading"></div>
      <div className="heading">Search Products</div>

      <div className="box-container">
        {products?.map((product: productI) => (
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
      {products.length > 1 && (
        <div className="paginate">
          <button onClick={() => prev(pageIndex)}>Prev</button>
          {products.length === 3 && (
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
          )}
        </div>
      )}
      {products.length < 1 && (
        <div className="no-data">
          <p>No data</p>
        </div>
      )}
    </section>
  );
};

export default Search;
