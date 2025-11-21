import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiMenu } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import ToggleButton from "./ToggleButton";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <nav
      className={`w-full backdrop-blur-xl border-b px-4 md:px-8 py-4 sticky top-0 z-50 rounded-b-3xl transition-colors duration-500
        ${
          isDark
            ? "bg-[#0f1629]/80 border-blue-500/20"
            : "bg-white/80 border-gray-200"
        }
      `}
    >
      {/* --- NAVBAR MAIN WRAPPER (3 sections) --- */}
      <div className="w-full flex items-center justify-between">
        {/* ========== LEFT: LOGO ========== */}
        <div className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
          <BsLightningChargeFill
            className={`${isDark ? "text-pink-400" : "text-pink-500"} text-3xl`}
          />
          <h1
            className={`text-2xl md:text-3xl font-semibold tracking-wide
              ${isDark ? "text-white" : "text-gray-900"}
            `}
          >
            Smart Recipe
          </h1>
        </div>

        {/* ========== CENTER: DESKTOP MENU ========== */}
        <div
          className={`hidden md:flex flex-1 justify-center gap-12 font-semibold text-xl
            ${isDark ? "text-blue-200" : "text-gray-700"}
          `}
        >
          {["Home", "Input", "Recipes"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : "/" + item.toLowerCase()}
              className="relative group transition-all"
            >
              <span className="group-hover:text-pink-500 transition-colors duration-300">
                {item}
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* ========== RIGHT: TOGGLE BUTTON (DESKTOP) ========== */}
        <div className="hidden md:flex items-center">
          <ToggleButton />
        </div>

        {/* ========== MOBILE MENU BUTTON ========== */}
        <button
          className={`md:hidden text-3xl transition-colors duration-300
            ${isDark ? "text-blue-200" : "text-gray-700"}
          `}
          onClick={() => setOpen(!open)}
        >
          <FiMenu />
        </button>
      </div>

      {/* ========== MOBILE MENU DROPDOWN ========== */}
      {open && (
        <div
          className={`md:hidden mt-4 rounded-xl p-4 shadow-lg border animate-slideDown
            ${
              isDark
                ? "bg-[#0f1629] border-blue-500/20 text-blue-200"
                : "bg-white border-gray-200 text-gray-700"
            }
          `}
        >
          {["Home", "Input", "Recipes"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : "/" + item.toLowerCase()}
              onClick={() => setOpen(false)}
              className="py-2 block hover:text-pink-500 transition-colors duration-300 text-lg"
            >
              {item}
            </Link>
          ))}

          <div className="mt-3">
            <ToggleButton />
          </div>
        </div>
      )}
    </nav>
  );
}
