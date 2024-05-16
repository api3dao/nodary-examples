# Nodary data feed reader example

> An example project for reading Nodary data feeds

See https://github.com/api3dao/data-feed-reader-example for instructions for using API3-managed dAPIs.
This project demonstrates using Nodary feeds without depending on API3 data feed curation or the [API3 Market](https://market.api3.org/dapis) frontend.

## Instructions

- Install dependencies

```sh
yarn
```

- Create a `.env` file similar to `example.env`

```sh
echo 'MNEMONIC="bike north stone..."' > .env
```

- Refer to [`feeds.json`](https://github.com/nodaryio/utilities/blob/main/data/feeds.json) to find a data feed you like

- Derive the sponsor wallet addresses.
  See the command below, but use your own `FEED_NAME` value.

```sh
FEED_NAME=ETH/USD yarn get-sponsor-wallet-addresses
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
NETWORK=bsc-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d yarn deploy-data-feed-proxy
```

- Deploy DataFeedReaderExample.
  See the command below, but use your own `NETWORK` and `PROXY` values.
  See the [supported networks section](#supported-networks) for valid `NETWORK` values.

```sh
NETWORK=bsc-testnet PROXY=0x93F7efd59A74A3Ccc7168C0De481461e5Bd9518c yarn deploy
```

- Have DataFeedReaderExample read from the proxy.
  See the command below, but use your own `NETWORK` value.

```sh
NETWORK=bsc-testnet yarn read-data-feed
```

## Supported networks

```sh
yarn list-supported-chains
```

See https://github.com/api3dao/chains for details

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
NETWORK=bsc-testnet PROXY=0x08506208E776ecbdF4cE9DB69C08Aa90A06825C0 yarn update-proxy
```

### Deploy a DataFeedProxyWithOev

> This section is for deploying a proxy that can receive OEV updates (in addition to base data feed updates).
> This proxy can only receive OEV updates when it is used alongside the [API3 OEV Relay](https://github.com/api3dao/oev-litepaper/blob/main/oev-litepaper.pdf).
> The API3 OEV Relay is not open to the public yet.

OEV auction proceeds are collected at the Api3ServerV1 contract.
At any time, any account can withdraw the accumulated proceeds belonging to a specific proxy to its _OEV beneficiary_ (refer to the [implementation](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/api3-server-v1/OevDataFeedServer.sol#L147) for exact information).
The OEV beneficiary of the proxy is specified while deploying it.

Users that want OEV-support should deploy a DataFeedProxyWithOev (instead of a DataFeedProxy), and specify the address of the OEV beneficiary while doing so.
See the command below, but use your own `NETWORK`, `DATA_FEED_ID` and `OEV_BENEFICIARY` values.

```sh
NETWORK=bsc-testnet DATA_FEED_ID=0x4385954e058fbe6b6a744f32a4f89d67aad099f8fb8b23e7ea8dd366ae88151d OEV_BENEFICIARY=0x07b589f06bD0A5324c4E2376d66d2F4F25921DE1 yarn deploy-data-feed-proxy-with-oev
```

Note that DataFeedProxy and DataFeedProxyWithOev have identical interfaces, which is exported by `@api3/contracts` as IProxy.
By using IProxy in your contract, you can seamlessly switch between a DataFeedProxy and a DataFeedProxyWithOev simply by updating the proxy address.
