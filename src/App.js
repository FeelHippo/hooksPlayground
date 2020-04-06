import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Gallery from './components/gallery';
import Detail from './components/detail.jsx';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Gallery} />
          <Route exact path='/:id' component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
