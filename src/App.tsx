import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
