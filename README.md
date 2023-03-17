# Nodary data feed reader example

> An example project for reading Nodary data feeds

## Instructions

- Install dependencies

```sh
yarn
```

- Create a `.env` file similar to `example.env`

```sh
echo 'MNEMONIC="bike north stone..."' > .env
```

- Refer to [`feedNames.json`](/data/feedNames.json) to find a data feed you like

- Derive the sponsor wallet addresses.
  See the command below, but use your own `FEED_NAME` value.

```sh
FEED_NAME=ETH/USD yarn get-sponsor-wallet-address
```

- Fund the sponsor wallet (unless it is already funded)

- Derive the data feed ID.
  See the command below, but use your own `FEED_NAME` value.

```sh
FEED_NAME=ETH/USD yarn get-data-feed-id
```

- Deploy the proxy to the data feed.
  See the command below, but use your own `NETWORK` and `DATA_FEED_ID` values.

```sh
NETWORK=polygon-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d yarn deploy-data-feed-proxy
```

- Deploy DataFeedReaderExample.
  See the command below, but use your own `NETWORK` and `PROXY` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=polygon-testnet PROXY=0x94C10721Bc55E81E40E5Db92060335374F32546b yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the command below, but use your own `NETWORK` value.

```sh
NETWORK=polygon-testnet yarn read-data-feed
```

## Supported networks

See https://github.com/api3dao/chains for details

- arbitrum-goerli-testnet
- arbitrum
- avalanche-testnet
- avalanche
- bsc-testnet
- bsc
- ethereum-goerli-testnet
- ethereum-sepolia-testnet
- ethereum
- fantom-testnet
- fantom
- gnosis-testnet
- gnosis
- moonbeam-testnet
- moonbeam
- moonriver
- optimism-goerli-testnet
- optimism
- polygon-testnet
- polygon

## Local development and testing

`@api3/contracts` provides a MockProxy contract for local development testing.
See the tests for its usage, and run the tests with

```sh
yarn test
```

# Advanced

### Update the proxy address of DataFeedReaderExample

You can update the proxy that your DataFeedReaderExample reads from.

- Follow the [instructions](#instructions)
- Deploy a new proxy
- See the command below, but use your own `NETWORK` and `PROXY` values

```sh
NETWORK=polygon-testnet PROXY=0x26690F9f17FdC26D419371315bc17950a0FC90eD yarn update-proxy
```
