// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Register from './pages/Authentication/register';
import Login from './pages/Authentication/login';
import PostList from './pages/PostList';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <div className="App">
       <Router>
    <Switch>
    <Route exact path="/register" component={Register} />
            <Route exact path="/" component={CustomerPage} />
            <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
    </div>
  );
}

export default App;
