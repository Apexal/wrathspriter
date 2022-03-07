import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { CreateCharacterPage } from "./pages/CreateCharactorPage/CreateCharacterPage";
import { CharacterDetailsStage } from "./pages/CreateCharactorPage/stages/CharacterDetailsStage";

// Page imports
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { SavedCharactersPage } from "./pages/SavedCharactersPage/SavedCharactersPage";

import "./sass/theme.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="create" element={<CreateCharacterPage />}>
          <Route index element={<CharacterDetailsStage />} />
          <Route path="programs" element={<p>Coming soon!</p>} />
          <Route path="moves" element={<p>Coming soon!</p>} />
          <Route path="review" element={<p>Coming soon!</p>} />
        </Route>
        <Route path="saved" element={<SavedCharactersPage />} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
