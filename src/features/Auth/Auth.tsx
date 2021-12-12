import { css } from 'emotion';
import LoginForm from './components/LoginForm';
import { Card } from 'antd';
import useToken from '../../common/hooks/useAuth';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("./assets/login-background.jpg")',
  }),
}

const Auth = (props: any) => {
    return (
      <div className={styles.container}>
        <Card title={'Antler Twitter App'}>
          <LoginForm />
        </Card>
      </div>
    )
}
export default Auth;
