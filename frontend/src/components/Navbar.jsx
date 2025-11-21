export default function Navbar() {
  return (
    <nav className="px-6 py-4 bg-indigo-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Smart Recipe Generator</h1>
      <div className="flex gap-6">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/recipes" className="hover:underline">
          Recipes
        </a>
      </div>
    </nav>
  );
}
