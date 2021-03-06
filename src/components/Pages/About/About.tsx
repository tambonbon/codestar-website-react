import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { translate, TranslationFunction } from 'react-i18next';
import { Typography } from '@material-ui/core';
import compose from 'recompose/compose';
import Container from '../../../Container/Container';
import OurStack from '../../../OurStack/OurStack';
import TeamCarousel from '../../Molecules/TeamCarousel/TeamCarousel';
import Section from '../../Molecules/Section/Section';
import { CustomButton } from '../../Atoms/CustomButton/CustomButton';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './About.styles';

interface IPropsInner {
  classes: any;
  t: TranslationFunction;
}

interface IPropsOuter {}

export const About: FC<IPropsInner> = ({ t, classes }) => {
  const [siteText0, siteText1] = t('SITE_TEXTS', {
    returnObjects: true,
  });
  return (
    <>
      <Section scrollname={'attract'} className="py-5">
        <Container marginTopNavBar>
          <div className="row justify-content-center">
            <div className={`col-12 col-md-8 ${classes.text}`}>
              <Typography variant="h2" color="inherit" gutterBottom>
                {t('ABOUT_ATTRACT_TITLE')}
              </Typography>
              <Typography variant="body1" color="inherit" gutterBottom>
                {t('ABOUT_ATTRACT_TEXT')}
              </Typography>
            </div>
            <div className="col-12 col-md-8 col-sd-6">
              <OurStack />
            </div>
          </div>
          <div className="row justify-content-center py-3">
            {/*Already in love? Check out{' '}*/}
            <CustomButton
              className="mt-3"
              variant="contained"
              component={Link}
              to={'/jobs'}
              color="inherit"
            >
              {t('ABOUT_VACANCIES')}
            </CustomButton>
          </div>
        </Container>
      </Section>
      <Section scrollname={'team'} className={`py-5 ${classes.teamSection}`}>
        <Container>
          <div className="row">
            <div className="col">
              <Typography variant="h4" align="center" className="mb-3">
                {t('ABOUT_TEAM_TITLE')}
              </Typography>
            </div>
          </div>
        </Container>
        <div className="row m-0">
          <TeamCarousel />
        </div>
      </Section>
      <Section scrollname={'site'} className={`py-5 ${classes.siteSection}`}>
        <Container>
          <div className="row justify-content-center">
            <div className={`col-12 col-md-8 ${classes.text}`}>
              <Typography variant="h2" color="inherit" gutterBottom>
                {t('SITE_TITLE')}
              </Typography>
              <Typography variant="body1" color="inherit" gutterBottom>
                {siteText0}
                <a href="https://github.com/code-star/codestar-website-react">
                  repo
                </a>
                {siteText1}
              </Typography>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default compose<IPropsInner, IPropsOuter>(
  withStyles(styles),
  translate(['about'], { wait: true })
)(About);
