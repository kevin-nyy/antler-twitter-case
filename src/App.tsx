import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import useToken from './common/hooks/useAuth';
import Auth from './features/Auth/Auth';

function App() {

  const { token } = useToken();
  const [ loggedIn, setLoggedIn ] = useState<boolean>(false);

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

  return (
    <div className="container">
      {loggedIn && <div/> || <Auth/> }
    </div>
  );
}

export default App;
