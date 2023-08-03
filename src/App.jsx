import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import Header from './components/Header.jsx';
import Feed from './pages/Feed/index.js';
import Archived from './pages/Archived/index.js';
import CallDetail from './pages/CallDetails/index.js';
import Footer from './components/Footer.jsx';

// Hey There!
// Thanks for the opportunity to make this test, I would like to
// clarify some stuff that I did. It would me more perfect than
// you can see. I didn't know if we could use different CSS libraries
// or compilers, I would use Bootstrap, Tailwind or other to make
// the design better. Also I could do a bunch of components that
// would make it more organized and with way less code, but with
// 48 hrs I didn't have time, since I am still with other 9-5 job
// for now. I really would like to be part of the team and I know
// that I can do way better than this. Please if you have any questions
// contact me.

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
