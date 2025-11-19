import React from 'react';
import App from 'next/app';
import { AppProvider } from '@shopify/polaris';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

class MyApp extends App {
  render() {
    const { Component, pageProps, host, apiKey } = this.props;
    
    const config = {
      apiKey: apiKey,
      host: host,
      forceRedirect: true
    };

    return (
      <AppBridgeProvider config={config}>
        <AppProvider i18n={translations}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </AppProvider>
      </AppBridgeProvider>
    );
  }

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const { ctx } = appContext;
    
    const host = ctx.query.host;
    const apiKey = process.env.SHOPIFY_API_KEY;

    return {
      ...appProps,
      host,
      apiKey
    };
  }
}

export default MyApp;
