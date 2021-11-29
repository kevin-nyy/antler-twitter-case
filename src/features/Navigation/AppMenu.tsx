import { css } from 'emotion';

import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const styles = {
  overlayContainer: css({
  }),
}

const AppMenu = (props: any) => {
  const onLogout = () => {
    console.log('handle logout'); // signout and remove token if required
  }

  return (
    <Menu onClick={onLogout} mode="horizontal">
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  )
}
export default AppMenu;

