import "./App.css";
import HelpButton from "./components/HelpButton";

function App() {
  return (
    <div className="App">
      <div className = "topBar">
        <HelpButton heading = "Super helpful help" message = "Here's a message to help you out!" />
      </div>
      <header className="App-header">
        <h1>Wrathspriter!</h1>
        <h2>The Ultimate Platform for Wrathskeller Customizability</h2>
      </header>
    </div>
  );
}

export default App;
