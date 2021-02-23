import logo from './logo.svg';
import './App.css';
import FilterCollection from './filterViews/FilterCollection'
import { Switch, Route, Router, Link} from 'react-router-dom';
import history from './utils/history'
import { connect } from "react-redux";


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path='/products' render={() => <FilterCollection />}/> 
          <Route path='/' render={() => <Link to='/products'>Products</Link>}/>      

        </Switch>
      </Router>
    </div>
  );
}

export default App;
