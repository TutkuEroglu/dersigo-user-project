import { Provider } from "react-redux";
import { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerts from "@/components/alert";
import { AppProps } from "next/app";
import store from "@/redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Provider store={store}>
        <Alerts/>
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;