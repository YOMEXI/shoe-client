import React from "react";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>Locations</h3>
            <a href="">Lagos</a>
            <a href="">Abuja</a>
          </div>
          <div className="box">
            <h3>Quick links</h3>
            <a href="">Login</a>
            <a href="">Register</a>
            <a href="">View Orders</a>
          </div>
          <div className="box">
            <h3>Hotlines</h3>
            <a href="">Contact Us</a>
            <a href="">+2348045678921</a>
            <a href="">YomiBlack@gmail.com</a>
          </div>
        </div>
        <div className="credits">copyright @ 2022</div>
      </section>
    </>
  );
};

export default Footer;
