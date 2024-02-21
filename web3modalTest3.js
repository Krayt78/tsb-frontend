import { createWeb3Modal, walletConnectProvider } from 'https://esm.sh/@web3modal/wagmi?bundle'
import { createConfig, configureChains } from "https://esm.sh/@wagmi/core@1.4.2";
import { arbitrum, mainnet } from 'https://esm.sh/@wagmi/core@1.4.2/chains'
import { publicProvider } from "https://esm.sh/@wagmi/core@1.4.2/providers/public";
import { WalletConnectConnector } from "https://esm.sh/@wagmi/core@1.4.2/connectors/walletConnect?bundle";
import { CoinbaseWalletConnector } from 'https://esm.sh/@wagmi/core@1.4.2/connectors/coinbaseWallet?bundle';
import { InjectedConnector } from 'https://esm.sh/@wagmi/core@1.4.2/connectors/injected?bundle';

const projectId = 'YOUR_PROJECT_ID'

const chains = [mainnet, arbitrum]

const { publicClient } = configureChains(chains, [
    walletConnectProvider({ projectId }),
    publicProvider()
]);

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata} }),
        new InjectedConnector({ chains, options: { shimDisconnect: true } }),
        new CoinbaseWalletConnector({ chains, options: { appName: metadata?.name ?? 'Unknown' } })
    ],
    publicClient
});

const modal = createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'light' })
modal.open();
//watchAccount((account) => console.log(account))

const loginButtonweb3modal = document.getElementById("loginButtonweb3modal");
loginButtonweb3modal.addEventListener("click", async () => {
    modal.open();
});