/* tslint:disable */

let cachedUpcomingEvents: any[];
let cachedPastEvents: any[];
let cachedRecentTweets: any[];

// This has been wrapped in a function to able to run unit tests where process.env.REACT_APP_STAGE is changed
function getUrl(lambdaName: string) {
  console.log(
    '~process.env.REACT_APP_STAGE~',
    process.env.REACT_APP_STAGE,
    lambdaName
  );

  if (lambdaName === 'get-recent-tweets') {
    return 'https://hjoutysc5k.execute-api.eu-west-1.amazonaws.com/test/get-recent-tweets';
  }

  if (process.env.REACT_APP_STAGE === 'dev') {
    return `/mock/${lambdaName}.json`;
  }
  const AWS_PREFIX =
    process.env.REACT_APP_STAGE === 'test' ? 'hjoutysc5k' : 'c3mmkmwyqi';
  const AWS_STAGE = process.env.REACT_APP_STAGE === 'test' ? 'test' : 'prod';
  return `https://${AWS_PREFIX}.execute-api.eu-west-1.amazonaws.com/${AWS_STAGE}/${lambdaName}`;
}

async function fetchUpcomingEvents() {
  try {
    const url = getUrl('get-upcoming-events');
    cachedUpcomingEvents = await fetch(url).then(data => data.json());
    return cachedUpcomingEvents;
  } catch (err) {
    // fail silently
    return null;
  }
}

// Should be drop-in replaceable with Redux Thunk
export async function getCachedUpcomingEvents() {
  return cachedUpcomingEvents ? cachedUpcomingEvents : fetchUpcomingEvents();
}

async function fetchPastEvents() {
  try {
    const url = getUrl('get-past-events');
    cachedPastEvents = await fetch(url).then(data => data.json());
    return cachedPastEvents;
  } catch (err) {
    // fail silently
    return null;
  }
}

export async function getCachedPastEvents() {
  return cachedPastEvents ? cachedPastEvents : fetchPastEvents();
}

async function fetchRecentTweets() {
  console.log('~fetchRecentTweets~start');
  try {
    const url = getUrl('get-recent-tweets');
    console.log('~url', url);
    cachedRecentTweets = await fetch(url).then(data => data.json());
    return cachedRecentTweets;
  } catch (err) {
    // fail silently
    return null;
  }
}

export async function getCachedRecentTweets() {
  return cachedRecentTweets ? cachedRecentTweets : fetchRecentTweets();
}
/* tslint:enable */
