import { css } from 'emotion';
import LoginForm from './components/LoginForm';
import { Card } from 'antd';

const styles = {
  overlayContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100vh', // TODO - unsplash this
    backgroundImage: 'url("https://wallpaperaccess.com/full/2014748.jpg")',
  }),
  // card: css({
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  // }),
}

const Auth = (props: any) => {
    return (
      <div className={styles.overlayContainer}>
        <Card title={'Antler Twitter App'}>
          <LoginForm />
        </Card>
      </div>
    )
}
export default Auth;
