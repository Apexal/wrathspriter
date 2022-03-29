import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Page imports
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { DevCreator } from "./pages/DevCreator/DevCreator";
import { SavedCharactersPage } from "./pages/SavedCharactersPage/SavedCharactersPage";
import { CreateCharacterPage } from "./pages/CreateCharacterPage/CreateCharacterPage";
import { CharacterDetailsStage } from "./pages/CreateCharacterPage/stages/CharacterDetailsStage";
import { CharacterProgramsStage } from "./pages/CreateCharacterPage/stages/CharacterProgramsStage";
import { CharacterStatesStage } from "./pages/CreateCharacterPage/stages/CharacterStatesStage";
import { ThemePage } from "./pages/ThemePage/ThemePage";

import "./sass/theme.scss";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route index element={<IndexPage />} />
        <Route path="create" element={<CreateCharacterPage />}>
          <Route index element={<CharacterDetailsStage />} />
          <Route path="programs" element={<CharacterProgramsStage />} />
          <Route path="states" element={<CharacterStatesStage />} />
          <Route path="actions" element={<p>Coming soon!</p>} />
          <Route path="review" element={<p>Coming soon!</p>} />
        </Route>
        <Route path="theme" element={<ThemePage />} />
        <Route path="saved" element={<SavedCharactersPage />} />
        <Route path="supersecretcharactercreator" element={<DevCreator />} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
