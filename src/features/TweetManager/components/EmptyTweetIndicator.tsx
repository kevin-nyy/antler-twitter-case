import { css } from 'emotion';
import { Button, Empty } from 'antd';
import { MouseEventHandler } from 'react';

const styles = {
  overlayContainer: css({
  }),
}

interface EmptyTweetIndicatorProps {
  onClick: MouseEventHandler;
}

const EmptyTweetIndicator = (props: EmptyTweetIndicatorProps) => {
  const { onClick } = props;

  return (
    <Empty
      description={
        <span>
          No tweets to be shown yet
        </span>
      }
    >
      <Button onClick={onClick} type="primary">Tweet</Button>
    </Empty>
  )
}
export default EmptyTweetIndicator;
