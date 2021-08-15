import React, {Component} from 'react';

import Spinner from '../spinner';

import ErrorBoundry from '../error-boundry';

const withData = (View) => {
	return class extends Component {

		state = {
			data: null
		};

		componentDidMount() {

			this.props.getData()
				.then((data) => {
					this.setState({data});
				});
		}

		render() {

			const {data} = this.state;

			if (data === null) {
				return (
					<div className="item-list">
						<Spinner/>
					</div>
				);
			}

			return (
				<ErrorBoundry>
					<View {...this.props} data={data}/>
				</ErrorBoundry>
			);
		}
	};
};

export default withData;