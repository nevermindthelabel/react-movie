import React from 'react';
import Header from '../elements/Header/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../elements/NotFound/NotFound'
import Movie from '../../pages/Movie/Movie';
import Home from '../../pages/Home/Home';

const App = () => {
  return(
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
