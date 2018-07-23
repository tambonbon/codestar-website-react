import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import {
	Button,
	Typography,
	Card,
	CardContent,
	CardMedia,
} from '@material-ui/core';
import Carousel from 'nuka-carousel';
import {
	NavigateNext as NavigateNextIcon,
	NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons';

import { getResponsiveImageUrl } from '../ResponsiveImage/ResponsiveImage';
import Container from '../Container/Container';
import OurStack from '../OurStack/OurStack';
import Team from './Team';
import css from './About.module.css';

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const cardWidth = 300;

@translate(['about'], { wait: true })
class About extends Component {
	render() {
		const { t } = this.props;
		return (
			<div>
				<section className="py-5">
					<Container marginTopNavBar>
						<div className="row justify-content-center">
							<div className="col-12 col-md-8">
								<h3 className={css.whiteText}>{t('ABOUT_ATTRACT_TITLE')}</h3>
								<p className={[css.whiteText, css.conduit].join(' ')}>
									{t('ABOUT_ATTRACT_TEXT')}
								</p>
							</div>
							<div className="col-12 col-md-8 col-sd-6">
								<OurStack />
							</div>
						</div>
						<div className="row justify-content-center py-3">
							{/*Already in love? Check out{' '}*/}
							<Button
								className="mt-3"
								variant="raised"
								component={Link}
								to="/jobs"
								color="inherit"
							>
								{t('ABOUT_VACANCIES')}
							</Button>
						</div>
					</Container>
				</section>
				<section className="py-5" style={{ background: '#eeeeee' }}>
					<Container>
						<div className="row">
							<div className="col">
								<Typography variant="display1" align="center" className="mb-3">
									{t('ABOUT_TEAM_TITLE')}
								</Typography>
							</div>
						</div>
					</Container>
					<div className="row m-0">{this.renderTeamCarousel()}</div>
				</section>
				{/*<section className="py-3 bg-white">
					<Container fluid>
						<div className="row">
							<div className="col">
								<h1>Photos</h1>
								<h1>Gallery</h1>
								<h1>Events</h1>
								<h1>Jobs</h1>
							</div>
						</div>
					</Container>
				</section>*/}
			</div>
		);
	}

	renderTeamCarousel() {
		return (
			<Carousel
				slideWidth={`${cardWidth}px`}
				wrapAround
				autoplay
				autoplayInterval={7000}
				cellAlign="center"
				slidesToScroll="auto"
				renderBottomCenterControls={null}
				renderCenterLeftControls={({ previousSlide }) => (
					<Button mini variant="fab" onClick={previousSlide}>
						<NavigateBeforeIcon />
					</Button>
				)}
				renderCenterRightControls={({ nextSlide }) => (
					<Button mini variant="fab" onClick={nextSlide}>
						<NavigateNextIcon />
					</Button>
				)}
			>
				{shuffleArray(Team)
					.filter(
						person => person && !person.gone && person.name && person.image
					)
					.map(person => (
						<Card key={person.image} className={`${css.card} my-3`}>
							<CardMedia
								className={css.cardMedia}
								image={getResponsiveImageUrl(
									`/images/team/${person.image}`,
									cardWidth * 2
								)}
								title={person.name}
							/>
							<CardContent>
								<Typography variant="headline" component="h3">
									{person.name}
								</Typography>
								<Typography
									style={{ marginBottom: 16, fontSize: 14 }}
									color="textSecondary"
								>
									{person.job}
								</Typography>
								<Typography component="i">{person.tagline}</Typography>
							</CardContent>
						</Card>
					))}
			</Carousel>
		);
	}
}

export default About;
