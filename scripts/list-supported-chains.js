const { CHAINS } = require('@api3/chains');
const { nodaryChainIds } = require('@nodary/utilities');

async function main() {
  const supportedChains = nodaryChainIds()
    .map((nodaryChainId) => CHAINS.find(({ id }) => id === nodaryChainId))
    .map((chain) => {
      return {
        id: Number(chain.id),
        name: chain.alias,
        type: chain.testnet ? 'testnet' : 'mainnet',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  console.table(supportedChains);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
