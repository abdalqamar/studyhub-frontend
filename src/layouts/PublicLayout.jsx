import ScrollToTop from "@/shared/components/ScrollToTop";
import Footer from "@/shared/layout/Footer";
import Navbar from "@/shared/layout/Navbar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
