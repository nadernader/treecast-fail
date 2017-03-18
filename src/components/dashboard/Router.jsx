
const React = require('react')

import { Router, Route, browserHistory } from 'react-router'

const App = require('./App')
const Login = require('./../common/Login')
const HomeSection = require('./HomeSection')
const TrendsSection = require('./TrendsSection')
const ItemsSection = require('./ItemsSection')
const CreateStrategy = require('./CreateStrategy')
const StrategySection = require('./StrategySection')

export default class DashboardRouter extends React.Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route component={Login} path='/login' />
        <Route component={App}>
          <Route path='/' component={HomeSection} />
          <Route path='/home' component={HomeSection} />
          <Route path='/trends' component={TrendsSection} />
          <Route path='/items' component={ItemsSection} />
          <Route path='/create-strategy' component={CreateStrategy} />
          <Route path='/strategies/:id' component={StrategySection} />
        </Route>
      </Router>
    )
  }
}
