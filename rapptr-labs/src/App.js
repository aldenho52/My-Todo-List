import {Route, Switch} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/todolist" component={TodoList} />
    </Switch>
    </div>
  );
}

export default App;
