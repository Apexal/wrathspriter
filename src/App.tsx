import "./App.css";
import HelpButton from "./components/HelpButton";

function App() {
  return (
    <div className="App">
      <div className = "topBar">
        <HelpButton heading = "Welcome to Wrathspriter!" message = "This is the companion app for creating characters for Wrathskeller! You'll choose a name, major, and minor and then take some poses! Already made a character and want to edit it or send to the game? Just navigate to the saved characters screen." />
      </div>
      <header className="App-header">
        <h1>Wrathspriter!</h1>
        <h2>The Ultimate Platform for Wrathskeller Customizability</h2>
      </header>
    </div>
  );
}

export default App;
