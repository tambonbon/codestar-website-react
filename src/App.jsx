import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './codestarMuiTheme';
import ScrollToTop from './ScrollToTop';
import NavBar from './NavBar/NavBar';
import SideMenu from './SideMenu/SideMenu';
import Footer from './Footer/Footer';
import jobsList from './Jobs/JobsList';
import AsyncComponent from './AsyncComponent/AsyncComponent';

function fullHeightAsyncComponent(C) {
	return props => <AsyncComponent fullHeight component={() => C} {...props} />;
}

const AsyncIntro = fullHeightAsyncComponent(import('./Intro/Intro'));
const AsyncCases = fullHeightAsyncComponent(import('./Cases/Cases'));
const AsyncAbout = fullHeightAsyncComponent(import('./About/About'));
const AsyncJobs = fullHeightAsyncComponent(import('./Jobs/Jobs'));
const AsyncJobDescription = fullHeightAsyncComponent(
	import('./JobDescription/JobDescription')
);
const AsyncContact = fullHeightAsyncComponent(import('./Contact/Contact'));

const sections = ['', 'cases', 'about', 'jobs', 'contact'];

class App extends Component {
	state = {
		drawerMenu: false,
	};

	constructor(props) {
		super(props);
		this.classes = props.classes;
		this.history = createHistory({ basename: process.env.PUBLIC_URL });

		this.history.listen(location =>
			this.updateBackgroundColor(location.pathname)
		);
		this.updateBackgroundColor(this.history.location.pathname);
	}

	updateBackgroundColor(pathname) {
		let section = pathname.split('/')[1];
		let index = sections.indexOf(section);
		document.body.style.backgroundPositionY = `${-index * 100}vh, 0`;
	}

	toggleDrawer = () => {
		this.setState(prevState => {
			return {
				drawerMenu: !prevState.drawerMenu,
			};
		});
	};

	render() {
		return (
			<Router history={this.history}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<NavBar toggle={this.toggleDrawer} />
					<SideMenu
						open={this.state.drawerMenu}
						toggle={this.toggleDrawer}
						history={this.history}
					/>

					<ScrollToTop>
						<Route exact path="/" component={AsyncIntro} />
						<Route exact path="/cases" component={AsyncCases} />

						<Route exact path="/jobs" component={AsyncJobs} />
						{jobsList.map(job => (
							<Route
								exact
								path={`/jobs/${job.path}`}
								key={job.path}
								render={() => <AsyncJobDescription {...job} />}
							/>
						))}

						<Route path="/about" component={AsyncAbout} />
						<Route path="/contact" component={AsyncContact} />
					</ScrollToTop>
					<Footer />
				</MuiThemeProvider>
			</Router>
		);
	}
}

export default App;
