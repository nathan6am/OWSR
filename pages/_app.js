import "../styles/globals.css";
import PublicLayout from "../components/layouts/PublicLayout";
import { Provider } from "react-redux";
import store from "../redux/store";
import AuthModal from "../components/AuthModal";
import DashboardLayout from "../components/layouts/DashboardLayout";
const layouts = {
  Public: PublicLayout,
  Dashboard: DashboardLayout,
};
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || PublicLayout;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
