import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function MainLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden transition-bg
        ${theme === "dark" ? "full-bg-dark" : "full-bg"}
      `}
    >
      <Navbar />

      {/* Scroll area */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
