import type { NextPage } from "next";

import Section from "../components/Section";
import Category from "../components/products/cartegories";
import Products from "../components/products/Product";

const Home: NextPage = () => {
  return (
    <>
      <Section />
      <Category />
      <Products />
    </>
  );
};

export default Home;
