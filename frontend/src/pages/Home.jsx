import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import GenerateButton from "../components/GenerateButton";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-10">
      <div className="text-center glass-panel p-10 max-w-3xl mx-auto rounded-3xl backdrop-blur-xl shadow-2xl">
        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg transition-colors duration-300
            ${isDark ? "text-blue-200" : "text-[#0f1629]/80"}
          `}
        >
          Smart Recipe Generator
        </h1>

        {/* Paragraph */}
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300
            ${
              isDark
                ? "text-blue-100 opacity-90"
                : "text-[#0f1629]/80 opacity-80"
            }
          `}
        >
          Upload ingredient photos, choose your dietary preferences, and get
          instant AI-powered recipe ideas with a delightful blueberry neon
          theme.
        </p>

        {/* Button */}
        <a
          href="/input"
          className="
            inline-block mt-10 px-8 py-3 md:px-10 md:py-4 
            text-lg md:text-xl font-semibold 
            rounded-xl
            transition-all duration-300
          "
        >
          <GenerateButton />
        </a>
      </div>
    </div>
  );
}
