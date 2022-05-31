import "../styles/globals.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import AuthModal from "../components/AuthModal";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        
        <AuthModal />
        <Component {...pageProps} />
      
      </Layout>
    </Provider>
  );
}

export default MyApp;
