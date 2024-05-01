import { Outlet } from "react-router-dom";
import SideHeader from "./NavBar";

export default function AdminLayout() {
  return (
    <>
      <SideHeader />
      <Outlet />
    </>
  );
}
