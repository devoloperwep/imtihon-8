import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <a
              className="underline text-blue-500 ml-2"
              href="https://github.com/devoloperwep"
            >
              Karimov Suhrobbek
            </a>
          </p>
        </aside>
      </footer>
    </>
  );
}

export default MainLayout;
