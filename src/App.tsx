import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";

// Page imports
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { SavedCharactersPage } from "./pages/SavedCharactersPage/SavedCharactersPage";
import { CreateCharacterPage } from "./pages/CreateCharacterPage/CreateCharacterPage";
import { CharacterDetailsStage } from "./pages/CreateCharacterPage/stages/CharacterDetailsStage";
import { CharacterProgramsStage } from "./pages/CreateCharacterPage/stages/CharacterProgramsStage";
import { CharacterStatesStage } from "./pages/CreateCharacterPage/stages/CharacterStatesStage";
import { ThemePage } from "./pages/ThemePage/ThemePage";
import { PoseTestingPage } from "./pages/PoseTestingPage/PoseTesting";

import "./sass/theme.scss";
import { CharacterReviewStage } from "./pages/CreateCharacterPage/stages/CharacterReviewStage";
import { CharacterActionsStage } from "./pages/CreateCharacterPage/stages/CharacterActionsStage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="create" element={<CreateCharacterPage />}>
          <Route index element={<CharacterDetailsStage />} />
          <Route path="programs" element={<CharacterProgramsStage />} />
          <Route path="states" element={<CharacterStatesStage />} />
          <Route path="actions" element={<CharacterActionsStage />} />
          <Route path="review" element={<CharacterReviewStage />} />
        </Route>
        <Route path="theme" element={<ThemePage />} />
        <Route path="saved" element={<SavedCharactersPage />} />
        <Route path="posing" element={<PoseTestingPage />} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
