import { useRouter } from "next/router";
import React from "react";

const Category = () => {
  const router = useRouter();

  const cat = {
    women: "women",
    men: "men",
    kids: "kids",
  };
  const catPage = (prop: any) => {
    router.push(`/products/category/[prop]`);
  };

  return (
    <div className="cat-container">
      <h4>Categories</h4>
      <div className="category">
        <div className="box male">
          <a href={`/product/category/${cat.men}`}>Men</a>
          {/* <i className="fas fa-male " ></i> */}
        </div>
        <div className="box female">
          {" "}
          <a href={`/product/category/${cat.women}`}>Women</a>
          {/* <i className="fas fa-female "></i> */}
        </div>
        <div className="box kids">
          {" "}
          <a href={`/product/category/${cat.women}`}>Kids</a>
          {/* <i className="fas fa-child"></i> */}
        </div>
      </div>
    </div>
  );
};

export default Category;
