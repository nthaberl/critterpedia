import './App.css';
import SearchBar from './components/SearchBar';
import { Route } from 'react-router-dom';
import BugDetail from './components/BugDetail';
import FishDetail from './components/FishDetail';
import SeaDetail from './components/SeaDetail';

function App() {
  return (
    <div className="App">

        <Route exact path="/">
        <SearchBar />
        </Route>

        <Route exact path="/bugs/:id">
          <BugDetail/>
        </Route>

        <Route exact path="/fish/:id">
          <FishDetail/>
        </Route>

        <Route exact path="/sea/:id">
          <SeaDetail/>
        </Route>
    </div>
  );
}

export default App;
