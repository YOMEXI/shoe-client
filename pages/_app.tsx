import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/media.css";
import "../styles/cart.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "../components/layout";

//
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SWRConfig } from "swr";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 10000,
        }}
      >
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
