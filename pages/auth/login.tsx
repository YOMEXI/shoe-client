import router, { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signUpDto } from "../../components/dto/authDto";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/auth/authAction";
import { ToastFailure, ToastSuccess } from "../../utils/alerts";
import { ToastContainer, toast } from "react-toastify";

const Login: React.FC<signUpDto> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;
  if (success) ToastSuccess(success);
  if (user && user.user.role === "user") {
    router.push("/");
  }
  if (user && user.user.role === "admin") {
    router.push("/product/admin");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (name: any) => (e: any) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const Submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({ ...formData }, router));
    setFormData({
      email: "",
      password: "",
    });
    if (error) ToastFailure(error.message);
  };

  return (
    <section className="register" id="register">
      <h3 className="sub-heading">Welcome</h3>
      <div className="change">
        <h1 className="heading" onClick={() => router.push("/auth/register")}>
          Sign Up
        </h1>
        <h1 className="heading">Sign In</h1>
      </div>

      <form onSubmit={Submit}>
        <div className="inputBox">
          <div className="input">
            <span>Email</span>
            <input
              type="text"
              name=""
              id="email"
              value={email}
              placeholder="enter email"
              onChange={handleChange("email")}
            />
            <div className="error">{error.email}</div>
          </div>
          <div className="input">
            <span>Password</span>
            <input
              type="password"
              name=""
              id="password"
              value={password}
              placeholder="enter password"
              onChange={handleChange("password")}
            />
            <div className="error">{error.password}</div>
          </div>
        </div>
        <input type="submit" value="Login" className="btn" />
      </form>
    </section>
  );
};

export default Login;
