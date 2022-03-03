import router, { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signUpDto } from "../../components/dto/authDto";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authAction";
import { ToastSuccess } from "../../utils/alerts";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Upload: React.FC<signUpDto> = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: any) => state.auth);
  const { loading, success, error, user } = auth;

  if (user && user.user.role != "admin") {
    router.push("/");
  }

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categories: "",
    size: "",
    imgUrl: "",
    color: "",
    form: new FormData(this),
  });

  const { title, description, price, categories, size, imgUrl, color, form } =
    formData;

  const handleChange = (name: string) => (e: any) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;

    form.set(name, value as Blob);
    setFormData({ ...formData, [name]: value });
  };

  const Submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/product/create`, form);

    setFormData({
      ...formData,
      title: "",
      description: "",
      price: "",
      categories: "",
      size: "",
      imgUrl: "",
      color: "",
    });
    ToastSuccess(data.msg);
  };

  return (
    <section className="register" id="register">
      <div className="change">
        <h1 className="heading">Create Product</h1>
      </div>

      <form onSubmit={(e) => Submit(e)}>
        <div className="inputBox">
          <div className="input">
            <span>Title</span>
            <input
              type="text"
              name=""
              value={title}
              placeholder="Title"
              onChange={handleChange("title")}
            />{" "}
          </div>
          <div className="input">
            <span>Description</span>
            <input
              type="text"
              name=""
              id="description"
              value={description}
              placeholder="Description"
              onChange={handleChange("description")}
            />
          </div>
          <div className="input">
            <span>Price</span>
            <input
              type="number"
              name=""
              id="price"
              value={price}
              placeholder="Price"
              onChange={handleChange("price")}
            />{" "}
          </div>

          <div className="input">
            <span>Size</span>
            <input
              type="text"
              name=""
              id="size"
              placeholder="Size"
              value={size}
              onChange={handleChange("size")}
            />{" "}
          </div>
          <div className="input">
            <span>Color</span>
            <input
              type="text"
              name=""
              id="color"
              value={color}
              placeholder="Color"
              onChange={handleChange("color")}
            />{" "}
          </div>
          <div className="input">
            <span>Categories</span>
            <input
              type="text"
              name=""
              value={categories}
              id="categories"
              placeholder="Categories"
              onChange={handleChange("categories")}
            />{" "}
          </div>
          <div className="input">
            <span>Image</span>
            <input
              type="file"
              name=""
              id="imgUrl"
              placeholder="Image"
              onChange={handleChange("image")}
            />{" "}
          </div>
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </section>
  );
};

export default Upload;
