import axios from "axios";
import { ToastFailure, ToastSuccess } from "../../utils/alerts";

import {
  pending,
  registerFail,
  registerSuccess,
  loginFail,
  loginSuccess,
} from "./authSlice";

export const register = (value: any, router: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.post("/api/auth/register", value);
    ToastSuccess(data.msg);
    dispatch(registerSuccess(data));
  } catch (error: any) {
    dispatch(registerFail({ ...error.data }));
  }
};

export const login = (value: any, router: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.post("/api/auth/login", value, {
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    });

    window.localStorage.setItem("user", JSON.stringify(data));
    if (data) {
      setTimeout(() => {
        router.push("/");
      }, 6000);
    }

    dispatch(loginSuccess(data));
  } catch (error: any) {
    dispatch(loginFail({ ...error.data }));
  }
};
