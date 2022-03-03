import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { getTotals } from "../redux/cart/cartSlice";
import { RootState } from "../redux/store";
import { logout } from "../utils/alerts";

export const Header = () => {
  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;

  const router = useRouter();

  const { cartTotalQuantity } = useSelector((state: any) => state.cart);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  //
  const [menu, setMenu] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [searchText, setsearchText] = useState("");
  const menuClick = () => {
    setNavBar(!navBar);
    setMenu(!menu);
  };

  const dispatch = useDispatch();

  const [search, useSearch] = useState(false);
  const clickSearch = () => {
    useSearch(!search);
  };

  useEffect(() => {
    dispatch(getTotals(""));
  }, [dispatch, cart]);

  //

  return (
    <>
      <header>
        <a className="logo" href="/">
          <i className="fas fa-shoe-prints"></i>Restify
        </a>
        <nav
          className={navBar ? "navbar active" : "navbar "}
          onClick={menuClick}
        >
          {user && (
            <>
              <a href="/" className="active ">
                Home
              </a>
              <a href="#" className="" onClick={() => logout()}>
                Log Out
              </a>
              {user?.user?.role === "admin" && (
                <a href="/product/upload">Upload Products</a>
              )}
            </>
          )}
          {!user && (
            <>
              <a href="/product/about" className="">
                About
              </a>

              <a href="/auth/register" className="">
                Sign-In/Sign-Up
              </a>
            </>
          )}
        </nav>
        <div className="icons">
          <i
            className={menu ? "fa-times" : "fas fa-bars"}
            id="menu-bars"
            onClick={menuClick}
          ></i>
          <i
            className="fas fa-search"
            id="search-icon"
            onClick={clickSearch}
          ></i>
          <a className="fas fa-heart" href="#"></a>
          <a className="fas fa-shopping-cart" href="/product/cart">
            <span className="cart-position">
              <p>{cartTotalQuantity}</p>
            </span>
          </a>
        </div>
      </header>
      <form className={search ? "search-form active" : "search-form"}>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="search-box"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
        <label
          htmlFor="search-box"
          className="fas fa-search"
          onClick={() => router.push(`/product/search/${searchText}`)}
        ></label>
        <i
          className="fas fa-times"
          id="close"
          onClick={() => useSearch(false)}
        ></i>
      </form>
    </>
  );
};

export default Header;
