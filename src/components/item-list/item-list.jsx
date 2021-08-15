import React from 'react';
import propTypes from 'prop-types';

import './item-list.styl';
import PropTypes from 'prop-types';

const ItemList = (props) => {

	const {data, onItemSelected, children: renderLabel} = props;

	const items = data.map((item, getData) => {
		const {id} = item;
		const label = renderLabel(item);
		return (
			<li className="item-list__item"
					key={id}
					onClick={() => onItemSelected(id)}>
				{label}
			</li>
		);
	});

	return (
		<div className="item-list">
			<ul className="item-list__wrapper">
				{items}
			</ul>
		</div>
	);
};

ItemList.defaultProps = {
	onItemSelected: () => {
	}
};

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
	data: PropTypes.arrayOf(PropTypes.object),
	children: PropTypes.func.isRequired
};

export default ItemList;