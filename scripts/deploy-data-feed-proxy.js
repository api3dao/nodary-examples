const hre = require('hardhat');
const api3Contracts = require('@api3/contracts');

async function main() {
  const dataFeedId = process.env.DATA_FEED_ID;
  if (!dataFeedId) {
    throw new Error('Environment variable DATA_FEED_ID is not defined');
  }
  const chainId = hre.network.config.chainId;

  const [deployer] = await hre.ethers.getSigners();

  const api3ServerV1 = api3Contracts.deploymentAddresses.Api3ServerV1[chainId.toString()];
  console.log('Deploying ProxyFactory contract...');

  const proxyFactory = await hre.deployments.deploy('ProxyFactory', {
    from: deployer.address,
    args: [api3ServerV1],
    log: true,
    deterministicDeployment: process.env.DETERMINISTIC ? hre.ethers.constants.HashZero : '',
  });

  console.log(
    `ProxyFactory contract${!proxyFactory.newlyDeployed ? ' was already ' : ' '}deployed to: ${proxyFactory.address}`
  );
  const proxyFactoryAddress = proxyFactory.address;

  const proxyFactoryArtifact = await hre.artifacts.readArtifact('IProxyFactory');
  const proxyFactoryContract = new hre.ethers.Contract(proxyFactoryAddress, proxyFactoryArtifact.abi, deployer);

  const dataFeedProxyAddress = await proxyFactoryContract.computeDataFeedProxyAddress(dataFeedId, '0x');

  if ((await hre.ethers.provider.getCode(dataFeedProxyAddress)) === '0x') {
    const receipt = await proxyFactoryContract.deployDataFeedProxy(dataFeedId, '0x');
    await new Promise((resolve) =>
      hre.ethers.provider.once(receipt.hash, () => {
        resolve();
      })
    );
    console.log(`DataFeedProxy for ${dataFeedId} is deployed at ${dataFeedProxyAddress} of ${hre.network.name}`);
  } else {
    console.log(
      `DataFeedProxy for ${dataFeedId} was already deployed at ${dataFeedProxyAddress} of ${hre.network.name}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
