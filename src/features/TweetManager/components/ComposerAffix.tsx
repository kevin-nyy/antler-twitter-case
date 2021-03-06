import { Button, Affix } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { MouseEventHandler } from 'react';

interface ComposerAffixProps {
  onClick: MouseEventHandler;
}

const ComposerAffix = (props: ComposerAffixProps) => {
  const { onClick } = props;

  return (
    <Affix style={{ position: 'absolute', right: '2vw' }} offsetTop={100}>
      <Button onClick={onClick} type="primary" shape="circle" icon={<TwitterOutlined />} size={"large"} />
    </Affix>
  )
}
export default ComposerAffix;
