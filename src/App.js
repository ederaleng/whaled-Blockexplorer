import React, { Component } from 'react';
import Serviceusers from './components/serviceusers'
import Servicetrx from './components/servicetrx'
import Homepage  from './components/homepage'
import blockPage from './components/blockPage'
import Err from './components/err'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Homepage}  />
            <Route exact path="/err" component={Err}  />
            <Route path="/trx/:id" component={Servicetrx}  />
            <Route path="/block/:id" component={blockPage}  />
            <Route path="/:id" component={Serviceusers}  />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
