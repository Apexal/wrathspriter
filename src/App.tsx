import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Page imports
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { SavedCharactersPage } from "./pages/SavedCharactersPage/SavedCharactersPage";

import "./sass/theme.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/saved" element={<SavedCharactersPage />} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
