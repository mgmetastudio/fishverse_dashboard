import { BscConnector } from '@binance-chain/bsc-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/f60fa484865f41f5a8f5d80a070e23ce',
	4: 'https://rinkeby.infura.io/v3/f60fa484865f41f5a8f5d80a070e23ce'
};

//metamask
export const injected = new InjectedConnector({
  supportedChainIds: [56, 137, 97, 66],
})

export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
		4: RPC_URLS[4]
	},
	qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [56, 137, 66]
});

export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[4],
	appName: 'demo-app',
	supportedChainIds: [56, 137, 66]
});

//Portis
export const portis = new PortisConnector({
  dAppId: process.env.NEXT_PUBLIC_PORTIS_ID ?? '',
  networks: [1],
})

// binance only
export const binance = new BscConnector({ supportedChainIds: [56] })