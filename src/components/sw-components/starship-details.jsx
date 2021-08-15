import React from 'react';

import ItemDetails, {Record} from '../item-details';

import {withSwapiService} from '../hoc-helper';

const StarshipDetails = (props) => {
	return (
		<ItemDetails {...props}>
			<Record field="model" label="Model"/>
			<Record field="length" label="Length"/>
			<Record field="cost" label="Cost"/>
		</ItemDetails>
	);
};

const mapMethodsToProps = ({getStarship, getStarshipImage}) => {
	return {
		getData: getStarship,
		getImageUrl: getStarshipImage
	};
};

export default withSwapiService(StarshipDetails, mapMethodsToProps);
