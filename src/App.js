import './App.css';
import { Home } from './modules';

function App() {
  return (
    <div className="container-fluid mt-3">
      <Home.Main />
      <Home.Footer />
    </div>
  );
}

export default App;