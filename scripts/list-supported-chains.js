const { CHAINS } = require('@api3/chains');
const { nodaryChainIds } = require('@nodary/utilities');

async function main() {
  const mainnets = [];
  const testnets = [];

  nodaryChainIds().forEach((chainId) => {
    const chain = CHAINS.find(({ id }) => id === chainId);
    if (!chain) {
      throw new Error(`Chain ${chainId} does not exist in @api3/chains`);
    }
    const { alias: chainAlias } = chain;
    chain.testnet ? testnets.push(chainAlias) : mainnets.push(chainAlias);
  });

  console.log('Mainnets:');
  mainnets.sort().forEach((chainAlias) => console.log(`  ${chainAlias}`));
  console.log('Testnets:');
  testnets.sort().forEach((chainAlias) => console.log(`  ${chainAlias}`));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
