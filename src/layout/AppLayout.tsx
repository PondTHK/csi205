import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="container main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
