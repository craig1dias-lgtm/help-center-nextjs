import React, { useState, useEffect } from 'react';
import { Page, Layout, Card, Frame } from '@shopify/polaris';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

const Index = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const helpCenterUrl = process.env.NEXT_PUBLIC_HELP_CENTER_URL || 'https://help-center-nextjs.vercel.app';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Frame>
      <Page title="MatchMint Help Center">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              {isLoaded && (
                <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                  <iframe
                    src={helpCenterUrl}
                    title="Help Center"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
};

export default Index;
