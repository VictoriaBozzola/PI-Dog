import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; //falta Router y Switch
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';
import Details from './components/Details';


function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
      <Switch>
        <Route exact path = '/' component= {Landing}/>
        <Route path='/home' component= {Home}/>
        <Route path='/create' component= {Create}/>
        <Route path='/:id' component= {Details}/>
      </Switch>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
