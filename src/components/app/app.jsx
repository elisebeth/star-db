import React, {Component} from 'react';

import './app.styl';

import Header from '../header';
import RandomPlanet from '../random-planet';
import {PeoplePage, PlanetPage, StarshipPage} from '../pages';

import {SwapiServiceProvider} from '../swapi-service-context';

import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';

export default class App extends Component {

    swapiService = new SwapiService();

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="app">
                        <Header/>
                        <RandomPlanet/>

                        <main className="main">
                            <PeoplePage/>
                            <PlanetPage/>
                            <StarshipPage/>
                        </main>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}