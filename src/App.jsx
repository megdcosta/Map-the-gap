import MapView from './components/MapView';
import FilterPanel from './components/FilterPanel';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>🗺️ Map the Gap</h1>
        <p>Visualizing equity in Toronto's public services</p>
      </header>
      <FilterPanel />
      <MapView />
    </div>
  );
}

export default App;