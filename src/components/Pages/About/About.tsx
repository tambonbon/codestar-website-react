import * as React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

// TODO package.json contains "npm-run-all"

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

import { getResponsiveImageUrl } from '../../../ResponsiveImage/ResponsiveImage';
import Container from '../../../Container/Container';
import OurStack from '../../../OurStack/OurStack';
import Team from './Team.json';
import styles from './About.module.scss';

type AboutProps = any;

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const cardWidth = 300;

// Fixme: this is a workaround for using the material ui button
// with the `to` property. By default this is not supported.
const CustomButton = (props: any) => <Button {...props} />;

class About extends React.Component<AboutProps> {
  public render() {
    const { t } = this.props;
    return (
      <div>
        <section className="py-5">
          <Container marginTopNavBar>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <h3 className={styles.whiteText}>{t('ABOUT_ATTRACT_TITLE')}</h3>
                <p className={[styles.whiteText, styles.conduit].join(' ')}>
                  {t('ABOUT_ATTRACT_TEXT')}
                </p>
              </div>
              <div className="col-12 col-md-8 col-sd-6">
                <OurStack />
              </div>
            </div>
            <div className="row justify-content-center py-3">
              {/*Already in love? Check out{' '}*/}
              <CustomButton
                className="mt-3"
                variant="raised"
                component={Link}
                to={'/jobs'}
                color="inherit"
              >
                {t('ABOUT_VACANCIES')}
              </CustomButton>
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
      </div>
    );
  }

  // TODO extract to Molecules/TeamCarousel
  public renderTeamCarousel() {
    return (
      <Carousel
        slideWidth={`${cardWidth}px`}
        wrapAround
        autoplay
        autoplayInterval={7000}
        cellAlign="center"
        slidesToScroll="auto"
        renderBottomCenterControls={undefined}
        renderCenterLeftControls={this.renderCenterLeftControls}
        renderCenterRightControls={this.renderCenterRightControls}
      >
        {shuffleArray(Team)
          .filter(
            (person: any) =>
              person && !person.gone && person.name && person.image
          )
          .map((person: any) => (
            <Card key={person.image} className={`${styles.card} my-3`}>
              <CardMedia
                className={styles.cardMedia}
                image={getResponsiveImageUrl(
                  `/images/team/${person.image}`,
                  cardWidth * 2,
                  'e_grayscale/co_rgb:0057ae,e_colorize:40'
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

  public renderCenterLeftControls = ({ previousSlide }: any) => {
    return (
      <Button mini variant="fab" onClick={previousSlide}>
        <NavigateBeforeIcon />
      </Button>
    );
  };

  public renderCenterRightControls = ({ nextSlide }: any) => {
    return (
      <Button mini variant="fab" onClick={nextSlide}>
        <NavigateNextIcon />
      </Button>
    );
  };
}

export default translate(['about'], { wait: true })(About);
