export const testNetChainInfo = {
  chainId: 'osmosis-1',
  chainName: 'Osmosis mainnet',
  rpc: 'https://rpc-osmosis.blockapsis.com',
  rest: 'https://lcd-osmosis.blockapsis.com',
  stakeCurrency: {
    coinDenom: 'OSMO',
    coinMinimalDenom: 'uosmo',
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'osmo',
    bech32PrefixAccPub: 'osmopub',
    bech32PrefixValAddr: 'osmovaloper',
    bech32PrefixValPub: 'osmovaloperpub',
    bech32PrefixConsAddr: 'osmovalcons',
    bech32PrefixConsPub: 'osmovalconspub',
  },
  currencies: [
    {
      coinDenom: 'OSMO',
      coinMinimalDenom: 'uosmo',
      coinDecimals: 6,
    },
  ],

  feeCurrencies: [
    {
      coinDenom: 'OSMO',
      coinMinimalDenom: 'uosmo',
      coinDecimals: 6,
    },
  ],

  coinType: 118,

  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.04,
  },
}
