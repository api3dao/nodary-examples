const nodaryUtilities = require('@nodary/utilities');
const feeds = require('../data/feeds.json');

async function main() {
  const feedName = process.env.FEED_NAME;
  if (!feedName) {
    throw new Error('Environment variable FEED_NAME is not defined');
  }
  const feed = feeds.find((feed) => feed.name === feedName);
  if (!feed) {
    throw new Error(`${feedName} is not a supported feed name`);
  }
  console.log(`${feedName} feed ID is ${nodaryUtilities.computeFeedId(feedName)}`);
  console.log(
    `Supported deviation thresholds are ${feed.deviationThresholdsInPercentages
      .map((deviationThresholdInPercentage) => `${deviationThresholdInPercentage}%`)
      .join(' ')}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
