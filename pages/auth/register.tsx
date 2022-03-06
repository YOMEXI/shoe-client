import router, { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signUpDto } from "../../components/dto/authDto";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authAction";
import { ToastFailure, ToastSuccess } from "../../utils/alerts";
import { ToastContainer, toast } from "react-toastify";

const Register: React.FC<signUpDto> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;

  if (user && user.user.role === "user") {
    router.push("/");
  }
  if (user && user.user.role === "admin") {
    router.push("/product/admin");
  }

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    imgUrl: "",
    pincode: "",

    email: "",
    password: "",
    address: "",
  });

  const {
    firstname,
    lastname,
    phone,
    pincode,

    email,
    password,
    address,
    username,
    imgUrl,
  } = formData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register({ ...formData }, router));
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      phone: "",
      imgUrl: "",
      pincode: "",

      email: "",
      password: "",
      address: "",
    });

    if (error) ToastFailure(error.message);
    if (success) ToastSuccess(success);
  };

  return (
    <section className="register" id="register">
      <h3 className="sub-heading">Welcome</h3>
      <div className="change">
        <h1 className="heading">Sign Up</h1>
        <h1 className="heading" onClick={() => router.push("/auth/login")}>
          Login
        </h1>
      </div>

      <form onSubmit={(e) => Submit(e)}>
        <div className="inputBox">
          <div className="input">
            <span>FirstName</span>
            <input
              type="text"
              value={firstname}
              id="firstname"
              placeholder="FirstName"
              onChange={handleChange}
            />
            <div className="error">{error.firstname}</div>
          </div>
          <div className="input">
            <span>LastName</span>
            <input
              type="text"
              value={lastname}
              id="lastname"
              placeholder="LastName"
              onChange={handleChange}
            />
            <div className="error">{error.lastname}</div>
          </div>
          <div className="input">
            <span>UserName</span>
            <input
              type="text"
              value={username}
              id="username"
              placeholder="LastName"
              onChange={handleChange}
            />
            <div className="error">{error.username}</div>
          </div>

          <div className="input">
            <span>Email</span>
            <input
              type="text"
              value={email}
              id="email"
              placeholder="enter email"
              onChange={handleChange}
            />
            <div className="error">{error.email}</div>
          </div>
          <div className="input">
            <span>Password</span>
            <input
              type="password"
              value={password}
              id="password"
              placeholder="enter password"
              onChange={handleChange}
            />
            <div className="error">{error.password}</div>
          </div>
          <div className="input">
            <span>Phone</span>
            <input
              type="text"
              value={phone}
              id="phone"
              placeholder="enter phone"
              onChange={handleChange}
            />
            <div className="error">{error.phone}</div>
          </div>

          <div className="input">
            <span>Address</span>
            <div className="error">{error.address}</div>
            <textarea
              value={address}
              id="address"
              placeholder="Enter address here"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <input type="submit" value="Sign-Up" className="btn" />
      </form>
    </section>
  );
};

export default Register;
