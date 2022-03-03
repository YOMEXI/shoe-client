import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import Category from "../../../components/products/cartegories";
import Products from "../../../components/products/Product";

const Cat = () => {
  const router = useRouter();

  let catquery = router.query.cat;
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("ASC");

  //
  const handleFilters = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  return (
    <>
      <Category />
      <div className="query">{router.query.cat}</div>
      <div className="filter-container">
        <div className="box">
          <h3>Filter Products</h3>
          <div className="color-filter">
            <form>
              <label className="cat-label">color</label>
              <select name="color" onChange={handleFilters}>
                <option value="any">any</option>
                <option value="blue">blue</option>
                <option value="black">black</option>

                <option value="red">red</option>
              </select>
            </form>
            <form>
              <label className="cat-label">size</label>
              <select name="size" onChange={handleFilters}>
                <option value="any">any</option>
                <option value="S">S</option>
                <option value="M">M</option>
              </select>
            </form>
          </div>
        </div>
        <div className="box">
          <h3>Sort Products</h3>

          <div className="sort-filter">
            <label className="cat-label">Price</label>
            <select onChange={(e) => setSort(e.target.value)}>
              <option disabled>price</option>
              <option value="newest">newest</option>
              <option value="DESC">Highest</option>
              <option value="ASC">Lowest</option>
            </select>
          </div>
        </div>
      </div>
      <Products cat={catquery} filters={filters} sort={sort} />
    </>
  );
};

export default Cat;
