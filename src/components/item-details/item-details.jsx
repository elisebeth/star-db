import React, {Component} from 'react';

import './item-details.styl';

import SwapiService from '../../services/swapi-service';

import Spinner from '../spinner';

import ThrowError from '../throw-error';
import ErrorBoundry from "../error-boundry";

const Record = ({item, field, label}) => {
	return (
		<li className="stats__item">{label} {item[field]}</li>
	);
}

export {
	Record
};

export default class ItemDetails extends Component {

	swapiService = new SwapiService();

	state = {
		item: null,
		loading: true,
		image: null
	};

	componentDidMount() {
		this.updatePerson();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updatePerson();
			this.setState({loading: true});
		}
	}

	updatePerson() {
		const {itemId, getData, getImageUrl} = this.props;

		if (itemId === null) {
			return;
		}

		getData(itemId)
			.then((item) => {
				this.setState({item, loading: false, image: getImageUrl(item)});
			})
	}

	render() {
		// console.log(this.state.loading);
		if (!this.state.item) {
			return <span className="wrong">Select an item from the list</span>;
		}

		const {item, loading, image} = this.state;


		// console.log(person);

		const spinner = loading ? <Spinner/> : null;
		const viewStats = !loading ? (
			<React.Fragment>
				<img className="item-details__img" src={image} alt={item.name}/>
				<figcaption className="item-details__content">
					<h2 className="content__title">{item.name}</h2>
					<ul className="content__stats">
						{
							React.Children.map(this.props.children, (child) => {
								return React.cloneElement(child, {item});
							})
						}
					</ul>
					<ThrowError/>
				</figcaption>
			</React.Fragment>
		) : null;

		return (
			<ErrorBoundry>
				<div className="item-details">
					<div className="item-details__wrapper">
						<figure className="item-details__figure">
							{spinner}
							{viewStats}
						</figure>
					</div>
				</div>
			</ErrorBoundry>
		);
	}
}

