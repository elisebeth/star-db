import React from 'react';

import ItemList from '../item-list/';
import {withData, withSwapiService} from '../hoc-helper';

const withChildFunction = (Wrapped, func) => {
	return (props) => {
		return (
			<Wrapped {...props}>
				{func}
			</Wrapped>
		);
	};
};

const renderName = ({name}) => `${name}`;
const renderNameAndPopulation = ({name, population}) => `${name} (population=${population})`;
const renderNameAndModel = ({name, model}) => `${name} (${model})`;


const mapPersonMethodsToProps = ({getAllPeople}) => {
	return {
		getData: getAllPeople
	};
};

const mapPlanetMethodsToProps = ({getAllPlanets}) => {
	return {
		getData: getAllPlanets
	};
};

const mapStarshipMethodsToProps = ({getAllStarships}) => {
	return {
		getData: getAllStarships
	};
};

const PersonList = withSwapiService(withData(
		withChildFunction(ItemList, renderName)),
	mapPersonMethodsToProps
);


const PlanetList = withSwapiService(withData(
		withChildFunction(ItemList, renderNameAndPopulation)),
	mapPlanetMethodsToProps
);


const StarshipList = withSwapiService(withData(
		withChildFunction(ItemList, renderNameAndModel)),
	mapStarshipMethodsToProps
);


export {
	PersonList,
	PlanetList,
	StarshipList
};

