import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5'

// 1. Get projectId
const projectId = '70692dcde0f21c835821dfe78f00d32a'

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://thesandbox-dao.webflow.io', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

modal.open().then(async (provider) => {
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    console.log('Address:', address)
    // The user is now connected
    // Here you can start your application logic
    // or call your custom login function
    // myLoginFunction(address)
    // ...
});
