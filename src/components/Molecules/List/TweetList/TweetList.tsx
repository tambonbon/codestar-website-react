import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  CardHeader,
  Avatar,
  Typography,
} from '@material-ui/core';
import { getResponsiveImageUrl } from '../../../../ResponsiveImage/ResponsiveImage';
import styles from './TweetList.module.scss';
import { ITweet } from '../../../../containers/EventsContainer/EventsContainer.interfaces';

interface ITweetListProps {
  tweets: ITweet[];
  eventDate: string;
  eventImage: string;
  eventName: string;
  children?: React.ReactNode;
}

const TweetList = ({
  tweets,
  eventDate,
  eventImage,
  eventName,
  children,
}: ITweetListProps) => {
  const firstTweetArr = tweets.slice(0, 1);
  return (
    <Card raised className={styles.card}>
      {firstTweetArr.map(tweet => (
        <CardHeader
          key={tweet.id}
          avatar={
            <Avatar
              src={tweet.user.profile_image_url_https}
              aria-label="Speaker Twitter Avatar"
            />
          }
          title={tweet.user.name}
          subheader={eventDate}
        />
      ))}
      <CardMedia
        image={eventImage}
        className={styles.media}
        title={eventName}
      />
      <CardContent>
        {tweets.map(tweet => (
          <div key={tweet.id} className="p-2">
            <a
              href={`https://twitter.com/${tweet.user.screen_name}/status/${
                tweet.id_str
              }`}
            >
              <Typography component="div" className={styles.prefix}>
                <img
                  src={getResponsiveImageUrl('/images/events/twitter', 30)}
                  className="mr-2"
                />
                {new Date(tweet.created_at).toDateString()}
              </Typography>
              <Typography component="p">{tweet.text}</Typography>
            </a>
          </div>
        ))}
      </CardContent>
      <CardActions>
        {children}
        {firstTweetArr.map(tweet => (
          <Button
            key={tweet.id}
            size="small"
            color="secondary"
            href={`https://twitter.com/${tweet.user.screen_name}?lang=en`}
          >
            About {tweet.user.name}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default TweetList;
