import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import AddResource from './components/AddResource'
import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addResource" component={AddResource} />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
