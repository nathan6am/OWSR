import "../styles/globals.css";
import PublicLayout from "../components/layouts/PublicLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import InviteLayout from "../components/layouts/InviteLayout";
const layouts = {
  Public: PublicLayout,
  Dashboard: DashboardLayout,
  Invite: InviteLayout,
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
