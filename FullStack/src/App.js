import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Add landing pages and navigation component to root component
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Add navigation menu and add routing confifurations inside the switch tag
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center"> 
        CoGrammar FullStack Project
      </h3>
      <Navigation/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/department" component={Department}/>
        <Route path="/employee" component={Employee}/>
      </Switch>     
    </div>
    </BrowserRouter>
  );
}

export default App;
