import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import AddResource from './components/AddResource'
import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/addResource" component={AddResource} />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
