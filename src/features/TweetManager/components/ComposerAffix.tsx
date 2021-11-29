import { css } from 'emotion';
import { Button, Affix } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import { MouseEventHandler } from 'react';

const styles = {
  overlayContainer: css({
  }),
}

interface ComposerAffixProps {
  onClick: MouseEventHandler;
}

const ComposerAffix = (props: ComposerAffixProps) => {
  const { onClick } = props;

  return (
    <Affix style={{ position: 'absolute', right: 200 }} offsetTop={100} onChange={(affixed) => console.log(affixed)}>
      <Button onClick={onClick} type="primary" shape="circle" icon={<TwitterOutlined />} size={"large"} />
    </Affix>
  )
}
export default ComposerAffix;
