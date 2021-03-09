import {Route, Switch} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TodoList from './components/TodoList';

function App() {
  return (
    <div>
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/todolist" component={TodoList} />
    </Switch>
    </div>
  );
}

export default App;
