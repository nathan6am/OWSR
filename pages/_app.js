import "../styles/globals.css";
import PublicLayout from "../components/layouts/PublicLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";

const layouts = {
  Public: PublicLayout,
  Dashboard: DashboardLayout,
};
function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || PublicLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
