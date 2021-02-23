import logo from './logo.svg';
import './App.css';
import FilterCollection from './filterViews/FilterCollection'

import { Switch, Route, Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

function App() {
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path='/products' render={() => <FilterCollection />}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
