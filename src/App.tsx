import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import useToken from './common/hooks/useAuth';
import Auth from './features/Auth/Auth';
import AppMenu from './features/Navigation/AppMenu';
import TweetManager from './features/TweetManager/TweetManager';

const { Header, Content, Footer } = Layout;

function App() {

  const { token } = useToken();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setLoggedIn(false);
      return;
    }
    token.getIdToken().then(() => {
      setLoggedIn(true);
    }).catch((error) => {
      console.error('Error fetching token: ', error);
      setLoggedIn(false);
    });
  }, [token])

  if (!loggedIn) {
    return <Auth />;
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <AppMenu></AppMenu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <TweetManager></TweetManager>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Antler Interview Project ©2021</Footer>
    </Layout>
  );
}

export default App;
