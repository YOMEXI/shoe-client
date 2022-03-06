import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { getTotals } from "../redux/cart/cartSlice";
import { RootState } from "../redux/store";
import { logout } from "../utils/alerts";

export const Header = () => {
  const auth = useSelector((state: any) => state.auth);
  const { user } = auth;

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

  const [search, Searching] = useState(false);

  useEffect(() => {
    dispatch(getTotals(""));
  }, [dispatch, cart]);

  //

  return (
    <>
      <header>
        <Link href="/">
          <a className="logo">
            <i
              className="fas fa-shoe-prints"
              style={{ marginRight: "10px" }}
            ></i>
            Footil
          </a>
        </Link>
        <nav
          className={navBar ? "navbar active" : "navbar "}
          onClick={menuClick}
        >
          {user && (
            <>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/">
                <a href="#" className="" onClick={() => logout()}>
                  Log Out
                </a>
              </Link>
              {user?.user?.role === "admin" && (
                <Link href="/product/upload">
                  <a className="" onClick={() => logout()}>
                    Upload Products
                  </a>
                </Link>
              )}
            </>
          )}

          <Link href="/product/about">
            <a>About</a>
          </Link>

          {!user && (
            <>
              <Link href="/auth/register">
                <a>Sign-In/Sign-Up</a>
              </Link>
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
            onClick={() => Searching(!search)}
          ></i>
          <Link href="#">
            <a className="fas fa-heart"></a>
          </Link>
          <Link href="/product/cart">
            <a className="fas fa-shopping-cart">
              <span className="cart-position">
                <p>{cartTotalQuantity}</p>
              </span>
            </a>
          </Link>
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
          onClick={() => Searching(false)}
        ></i>
      </form>
    </>
  );
};

export default Header;
