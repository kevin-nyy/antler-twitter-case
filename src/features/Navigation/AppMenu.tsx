import { css } from 'emotion';

import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useToken } from '../../common/hooks/useAuth';

const styles = {
  header: css({
    margin: '0 auto',
  }),
}

const AppMenu = (props: any) => {

  
  const { token, logout } = useToken();
  
  const onLogout = () => {
    logout();
  }

  return (
    <Menu onClick={onLogout} mode="horizontal">
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
      <h1 className={styles.header}>Manage Tweets</h1>
    </Menu>
  )
}
export default AppMenu;

