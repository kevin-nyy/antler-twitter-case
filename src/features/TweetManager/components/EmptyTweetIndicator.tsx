import { Button, Empty } from 'antd';
import { MouseEventHandler } from 'react';

interface EmptyTweetIndicatorProps {
  onClick: MouseEventHandler;
}

const EmptyTweetIndicator = (props: EmptyTweetIndicatorProps) => {
  const { onClick } = props;

  return (
    <Empty
      description={
        <span>
          Tweet something!
        </span>
      }
    >
      <Button onClick={onClick} type="primary">Tweet</Button>
    </Empty>
  )
}
export default EmptyTweetIndicator;
