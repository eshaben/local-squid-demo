# Demo Project: Indexing ERC-20 Transfer Data on a Local Moonbeam Development Node with Subsquid

This repository contains a demo [Hardhat project](https://docs.moonbeam.network/builders/build/eth-api/dev-env/hardhat/) that includes a basic ERC-20 contract and a [Squid](https://docs.moonbeam.network/builders/integrations/indexers/subsquid/) that connects to a local [Moonbeam development node](https://docs.moonbeam.network/builders/get-started/networks/moonbeam-dev/).

**This project is for demo purposes only**.

For step-by-step instructions on how to create this project, please review the tutorial on the Moonbeam Documentation site: https://docs.moonbeam.network/tutorials/integrations/local-subsquid/

This project assumes you have a Moonbeam development node running on port `9944`.

## Install Dependencies

You'll need to install dependencies from the root directory:

```
npm install
```

You'll also need to install dependencies from the `local-squid` directory:

```
cd local-squid && npm install
```

## Compile & Deploy the Contracts

To compile the contract in this repository, you can run:

```
npx hardhat compile
```

To deploy the contract on a Moonbeam development node, you can run:

```
npx hardhat run scripts/deploy.js --network dev
```

## Transfer ERC-20s

Since the indexer relies on indexing `Transfer` events, you can use the `scripts/transactions.js` script to send a few transactions:

```
npx hardhat run scripts/transactions.js --network dev
```

## Start Local Archive & Indexer

You'll need to first start the local Archive:

```
sqd archive-up
```

To run the indexer, you can run the following commands:

```
sqd build
sqd up
sqd migration:clean
sqd migration:generate
sqd process
```

You can access the GraphQL server by running:

```
sqd serve
```

The server will be launched and can be accessed at [localhost:4350/graphql](http://localhost:4350/graphql)
