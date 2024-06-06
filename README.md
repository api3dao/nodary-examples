# Nodary data feed reader example

> An example project that reads a [Nodary](https://nodary.io/) data feed

This project demonstrates using a single-source Nodary feed without depending on API3 data feed curation or the [market.api3.org](https://market.api3.org) frontend.
See https://github.com/api3dao/data-feed-reader-example for an example that uses an API3 data feed.

## Instructions

- Install dependencies

```sh
yarn
```

- Create a `.env` file similar to `example.env`

```sh
echo 'MNEMONIC="bike north stone..."' > .env
```

- Go to [nodary.io/feeds](https://nodary.io/feeds) and find a data feed you like

  - Copy the data feed ID (denoted as the _Beacon ID_) from the table.
    You can also use the following command with your `FEED_NAME` value.

    ```sh
    FEED_NAME=ETH/USD yarn get-data-feed-id
    ```

  - Copy the sponsor wallet address corresponding to the deviation threshold you like from the table.
    You can also use the following command with your `FEED_NAME` value.

    ```sh
    FEED_NAME=ETH/USD yarn get-sponsor-wallet-addresses
    ```

- Fund the sponsor wallet (unless it is already funded).
  The Nodary feed will start updating within 15 minutes of the sponsor wallet being funded.

- Deploy `DataFeedProxy` by using the command below with your `NETWORK` and `DATA_FEED_ID` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=ethereum-sepolia-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d yarn deploy-data-feed-proxy
```

- Deploy `DataFeedReaderExample` by using the command below with your `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x93F7efd59A74A3Ccc7168C0De481461e5Bd9518c yarn deploy
```

- Have `DataFeedReaderExample` read from the proxy you have deployed by using the command below with your `NETWORK` value

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```

## Supported networks

Chains listed on [nodary.io/chains](https://nodary.io/chains) are all supported.
You can run the following command to list them.

```sh
yarn list-supported-chains
```

## Local development and testing

`@api3/contracts` provides a `MockProxy` contract for local development.
See the [tests](./test/DataFeedReaderExample.sol.js) for its usage, and run the tests with the following command.

```sh
yarn test
```

## Update the proxy address of `DataFeedReaderExample`

You can update the proxy that your `DataFeedReaderExample` reads from.

- Follow the [instructions](#instructions)
- Find a new feed on [nodary.io/feeds](https://nodary.io/feeds) and deploy its proxy
- Use the command below with your `NETWORK` and `PROXY` values

```sh
NETWORK=ethereum-sepolia-testnet PROXY=0x08506208E776ecbdF4cE9DB69C08Aa90A06825C0 yarn update-proxy
```

- Use the command below to confirm that `DataFeedReaderExample` now reads the new data feed

```sh
NETWORK=ethereum-sepolia-testnet yarn read-data-feed
```
