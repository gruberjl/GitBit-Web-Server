import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from './pages/index'
import Login from './pages/login'
import SignUp from './pages/sign-up'

const Index = (
  <Router>
    <Switch>
      <Route path="/login"><Login /></Route>
      <Route path="/sign-up"><SignUp /></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  </Router>
)

ReactDOM.render(Index, document.getElementById('root'))
