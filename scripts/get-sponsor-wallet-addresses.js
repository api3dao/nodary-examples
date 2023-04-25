const nodaryUtilities = require('@nodary/utilities');

async function main() {
  const feedName = process.env.FEED_NAME;
  if (!feedName) {
    throw new Error('Environment variable FEED_NAME is not defined');
  }
  const feed = nodaryUtilities.nodaryFeeds.find((feed) => feed.name === feedName);
  if (!feed) {
    throw new Error(`${feedName} is not a supported feed name`);
  }
  feed.deviationThresholdsInPercentages.map((deviationThresholdInPercentage) => {
    console.log(
      `${deviationThresholdInPercentage}% deviation threshold sponsor wallet address for ${feedName} is ${nodaryUtilities.computeSponsorWalletAddress(
        feedName,
        deviationThresholdInPercentage * 1e6,
        0,
        24 * 60 * 60
      )}`
    );
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
