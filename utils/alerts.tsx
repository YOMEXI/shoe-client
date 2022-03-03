import axios from "axios";
import { toast } from "react-toastify";

export const ToastSuccess = (msg: any) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastFailure = (msg: any) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const logout = async () => {
  await axios.get("/api/auth/logout");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};
