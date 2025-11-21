import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0f1629]/80 backdrop-blur-xl glass-panel border-b border-blue-500/20 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-400 drop-shadow">
          Smart Recipe Generator
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-blue-300">
          <a href="/" className="hover:text-blue-400 transition-all text-lg">
            Home
          </a>

          <a
            href="/input"
            className="hover:text-blue-400 transition-all text-lg"
          >
            Input
          </a>

          <a
            href="/recipes"
            className="hover:text-blue-400 transition-all text-lg"
          >
            Recipes
          </a>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-blue-300 text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-blue-200 text-lg glass-panel p-4 rounded-lg border border-blue-500/20">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="/input"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 transition"
          >
            Input
          </a>

          <a
            href="/recipes"
            onClick={() => setOpen(false)}
            className="hover:text-blue-400 transition"
          >
            Recipes
          </a>
        </div>
      )}
    </nav>
  );
}
