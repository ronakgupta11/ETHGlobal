import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
require('../styles/globals.css');
import Head from "next/head";


export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Social X AI',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <>
      <Head>
        <title>Template App</title>
      </Head>


        <div className="flex flex-col h-screen">

          <AppBar/>
          <ContentContainer>
          <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
      </RainbowKitProvider>
      </WagmiConfig>
          </ContentContainer>
          <Footer/>
        </div>

    </>
);
}
