import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './random-planet.styl';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

    static defaultProps = {
        updatePlanetInterval: 5000
    };

    static propTypes = {
        updatePlanetInterval: PropTypes.number
    };

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        const {updatePlanetInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updatePlanetInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    planetLoaded = (planet) => {
        this.setState({planet, loading: false, error: false});
    };

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 20) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.planetLoaded)
            .catch(this.onError);
    };

    render() {
        const {planet, loading, error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const viewPlanet = hasData ? <ViewPlanet planet={planet}/> : null;


        return (
            <section className="random-planet">
                <div className="random-planet__wrapper">
                    <figure className="random-planet__figure">
                        {spinner}
                        {viewPlanet}
                        {errorMessage}
                    </figure>
                </div>
            </section>
        );
    }
}

const ViewPlanet = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <React.Fragment>
            <img className="random-planet__img" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt="planet"/>
            <figcaption className="random-planet__content">
                <h2 className="content__title">{name}</h2>
                <ul className="content__stats-list">
                    <li className="stats-list__item">Population {population}</li>
                    <li className="stats-list__item">Rotation period {rotationPeriod}</li>
                    <li className="stats-list__item">Diameter {diameter}</li>
                </ul>
            </figcaption>
        </React.Fragment>
    );
};