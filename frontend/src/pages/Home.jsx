export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Smart Recipe Generator</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Upload images of ingredients, add dietary preferences and get
        personalized recipes instantly.
      </p>

      <a
        href="/input"
        className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded text-lg"
      >
        Get Started
      </a>
    </div>
  );
}
