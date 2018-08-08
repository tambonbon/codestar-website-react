import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../NavBar/NavBar';
import SideMenu from '../../SideMenu/SideMenu';

const GET_UPCOMING_EVENTS_URL =
	'https://2sif0durcj.execute-api.eu-west-1.amazonaws.com/dev/get-upcoming-events';

export default class NavContainer extends Component {
	state = {
		drawerMenu: false,
		nextEvent: null,
	};

	componentDidMount() {
		this.fetchUpcomingEvent.call(this);
	}

	async fetchUpcomingEvent() {
		try {
			let url = GET_UPCOMING_EVENTS_URL;
			if (process.env.REACT_APP_STAGE === 'dev') {
				url = '/mock/getUpcomingEvents.json';
			}
			const response = await fetch(url).then(data => data.json());
			const nextEvent = response[0];
			if (nextEvent) {
				this.setState({ nextEvent });
			}
		} catch (err) {
			// fail silently
		}
	}

	toggleDrawer = () => {
		this.setState(prevState => {
			return {
				drawerMenu: !prevState.drawerMenu,
			};
		});
	};

	// TODO can we somehow re-use EventsContainer instead of duplicating the service call here?
	render() {
		return (
			<Fragment>
				<NavBar toggle={this.toggleDrawer} nextEvent={this.state.nextEvent} />
				<SideMenu
					open={this.state.drawerMenu}
					toggle={this.toggleDrawer}
					history={this.props.history}
					nextEvent={this.state.nextEvent}
				/>
			</Fragment>
		);
	}
}

NavContainer.propTypes = {
	history: PropTypes.object.isRequired,
};
