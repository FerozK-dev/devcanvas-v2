import './index.css';
import AppHeader from './components/shared/AppHeader';
import RouterSetup from "./components/RouterSetup";

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <RouterSetup/>
    </div>
  );
}

export default App;
