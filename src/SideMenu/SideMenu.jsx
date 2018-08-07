import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
} from '@material-ui/core';
import {
	Dashboard as DashboardIcon,
	Business as BusinessIcon,
	People as PeopleIcon,
	Code as CodeIcon,
	Email as EmailIcon,
	Event as EventIcon,
} from '@material-ui/icons';

const list = [
	{
		text: 'Home',
		icon: <DashboardIcon />,
		link: '/',
	},
	{
		text: 'Events',
		icon: <EventIcon />,
		link: '/events',
		canHaveNotification: true,
	},
	{
		text: 'Cases',
		icon: <BusinessIcon />,
		link: '/cases',
	},
	{
		text: 'ABOUT',
		icon: <PeopleIcon />,
		link: '/about',
	},
	{
		text: 'Jobs',
		icon: <CodeIcon />,
		link: '/jobs',
	},
	{
		text: 'Contact',
		icon: <EmailIcon />,
		link: '/contact',
	},
];

@translate(['nav'], { wait: true })
class SideMenu extends Component {
	state = { location: null };

	componentDidMount() {
		this.props.history.listen(location => this.setLocation(location.pathname));
		this.setLocation(this.props.history.location.pathname);
	}

	setLocation(location) {
		this.setState({ location: `/${location.split('/')[1]}` });
	}

	getPrimaryText(item) {
		const { t } = this.props;
		const notificationIcon = this.props.nextEvent ? (
			<span style={{ color: 'red' }}> ●</span>
		) : null;
		if (item.canHaveNotification) {
			return (
				<Fragment>
					{t(item.text)}
					{notificationIcon}
				</Fragment>
			);
		}
		return t(item.text);
	}

	render() {
		const { t, ...props } = this.props;
		return (
			<Drawer open={props.open} onClose={props.toggle}>
				<div
					tabIndex={0}
					role="button"
					onClick={props.toggle}
					onKeyDown={props.toggle}
				>
					<List>
						{list.map(item => (
							<Link
								to={item.link}
								key={t(item.text)}
								style={{ textDecoration: 'none' }}
							>
								<ListItem button>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText
										primary={this.getPrimaryText(item)}
										primaryTypographyProps={
											this.state.location === item.link
												? { color: 'primary', style: { fontWeight: 500 } }
												: null
										}
									/>
								</ListItem>
							</Link>
						))}
					</List>
				</div>
			</Drawer>
		);
	}
}

export default SideMenu;