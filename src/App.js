// index.js

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import Home from './components/Home'

import Test from './components/Test'
import Result from './components/Result'
import Register from './components/Register'
import BackgroundAnimation from './components/BackgroundAnimation'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/test/html" component={Test} />
      <ProtectedRoute exact path="/result" component={Result} />
      <Route component={NotFound} />
    </Switch>
    <BackgroundAnimation />
  </BrowserRouter>
)

export default App
