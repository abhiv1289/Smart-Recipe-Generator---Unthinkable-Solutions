export default function Footer() {
  return (
    <footer
      className="w-full py-6 mt-10 flex items-center justify-center 
      bg-[#0f1629] 
      glass-panel 
      border-t border-blue-500/20 
      text-blue-300 text-sm 
      backdrop-blur-xl"
    >
      <p className="tracking-wide drop-shadow-sm">
        © {new Date().getFullYear()} Smart Recipe Generator —
        <span className="text-blue-400 font-semibold"> Assignment</span>
      </p>
    </footer>
  );
}
