import React, { Component } from 'react';
import Events from '../../components/Events/Events';
import _ from 'lodash';
import {
	getCachedUpcomingEvents,
	getCachedPastEvents,
} from '../../eventsService';

function convertEventResponseToModel(withDescription = false) {
	return function(mEvent) {
		const fallbackImage =
			'https://res.cloudinary.com/codestar/image/upload/v1532409289/codestar.nl/meetup/codestar-night-logo.jpg';
		const result = {
			name: mEvent.name,
			time: mEvent.time,
			link: mEvent.link,
			coverUrl: _.get(mEvent, 'featured_photo.photo_link', fallbackImage),
			withDescription,
		};
		if (withDescription) {
			Object.assign(result, {
				description: mEvent.description,
			});
		}
		return result;
	};
}

export default class EventsContainer extends Component {
	state = {
		nextMeetupEvents: [],
		loadingNextMeetupEvent: true,
		noNextMeetupEvent: false,
		pastMeetupEvents: [],
	};

	componentDidMount() {
		this.fetchEvents();
	}

	async fetchEvents() {
		try {
			const response = await getCachedUpcomingEvents();
			const nextMeetupEvents = response.map(convertEventResponseToModel(true));
			this.setState({
				nextMeetupEvents,
				loadingNextMeetupEvent: false,
				noNextMeetupEvent: !(nextMeetupEvents && nextMeetupEvents.length > 0),
			});
		} catch (err) {
			this.setState({
				nextMeetupEvents: null,
				loadingNextMeetupEvent: false,
				noNextMeetupEvent: true,
			});
		}

		try {
			const response = await getCachedPastEvents();
			const pastMeetupEvents = response.map(convertEventResponseToModel());
			this.setState({ pastMeetupEvents });
		} catch (err) {
			this.setState({ pastMeetupEvents: [] });
		}
	}

	render() {
		return (
			<Events
				nextMeetupEvents={this.state.nextMeetupEvents}
				noNextMeetupEvent={this.state.noNextMeetupEvent}
				pastMeetupEvents={this.state.pastMeetupEvents}
			/>
		);
	}
}
