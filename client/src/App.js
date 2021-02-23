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
<<<<<<< HEAD

=======
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
