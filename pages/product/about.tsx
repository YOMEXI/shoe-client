import React from "react";

const about = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="sub-heading">About Us</div>
        <div className="heading">Why Patronize Us</div>
        <div className="row">
          <div className="image">
            <img src="/img/foodlogo.jpg" alt="" />
          </div>
          <div className="content">
            <h3>Quality meals at comfort</h3>
            <p>
              {" "}
              error eveniet esse, sequi ipsam dignissimos delectus deserunt.
            </p>
            <div className="icons-container">
              <div className="icons">
                <i className="fas fa-truck"></i>
                <span>Fast Delivery</span>
              </div>
              <div className="icons">
                <i className="fas fa-wallet"></i>
                <span>Easy payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default about;
