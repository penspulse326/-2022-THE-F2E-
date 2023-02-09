import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <div style={{ width: "100vw" }}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
