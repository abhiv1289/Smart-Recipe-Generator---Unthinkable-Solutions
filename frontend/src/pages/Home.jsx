export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-[#0b0f19]">
      <div className="text-center glass-panel p-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">
          Smart Recipe Generator
        </h1>

        <p className="text-lg md:text-xl text-blue-200 opacity-80 max-w-2xl mx-auto leading-relaxed">
          Upload ingredient photos, choose your dietary preferences, and get
          instant AI-powered recipe ideas with a delightful blueberry neon
          theme.
        </p>

        <a
          href="/input"
          className="
            inline-block mt-10 px-8 py-3 md:px-10 md:py-4 
            text-lg md:text-xl font-semibold 
            text-white 
            rounded-xl 
            bg-blue-600 
            neon-glow 
            transition-transform duration-300 
            hover:scale-105 hover:bg-blue-500
          "
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
