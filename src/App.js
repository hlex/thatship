import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home } from './pages'
import { Header, Footer } from './components'


const App = () => {
  return (
    <div className="app">
      <Header />
      <div style={{ marginTop: 80 }}>
        <Router>
          <Route path="/" exact component={Home} />
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
