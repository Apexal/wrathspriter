import { Route, Routes } from "react-router-dom";

import "./sass/theme.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Routes>
    </div>
  );
}

export default App;
