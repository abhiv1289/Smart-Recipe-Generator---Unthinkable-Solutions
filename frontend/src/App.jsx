import { Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
