import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import Header from './components/Header.jsx';
import Feed from './pages/Feed/index.js';
import Archived from './pages/Archived/index.js';
import CallDetail from './pages/CallDetails/index.js';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="container">
      <Header />
      <Router>
        <div className="container-view">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/archived" element={<Archived />} />
            <Route path="/call" element={<CallDetail />}>
              <Route path=":slug" element={<CallDetail />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
