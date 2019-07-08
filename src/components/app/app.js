import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import { StarshipDetails } from '../sw-components/details';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    hasError: false,
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service(),
      };
    })
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService }>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={ this.onServiceChange }/>
              <RandomPlanet/>

              <Route
                path="/"
                render={ () => <h2>Welcome to StarDB</h2> }
                exact
              />
              <Route
                path="/people/"
                component={ PeoplePage }
              />
              <Route
                path="/planets/"
                component={ PlanetsPage }
              />
              <Route
                path="/starships/"
                component={ StarshipsPage }
                exact
              />
              <Route
                path="/starships/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={ id } />;
                }}
              />

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
