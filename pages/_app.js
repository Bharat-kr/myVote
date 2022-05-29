import { Web3Provider } from "../context/Web3Context";
import { ToastProvider } from "react-toast-notifications";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={8000}
      placement="bottom-left"
    >
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ToastProvider>
  );
}

export default MyApp;
