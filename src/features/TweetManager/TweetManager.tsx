import { css } from 'emotion';
// import LoginForm from './components/LoginForm';
import { Affix, Button } from 'antd';
import Composer from './components/Composer';
import EmptyTweetIndicator from './components/EmptyTweetIndicator';
import ComposerAffix from './components/ComposerAffix';
import { useState } from 'react';
import ComposerModal from './components/ComposerModal';

const styles = {
  overlayContainer: css({
  }),
  // card: css({
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  // }),
}

const TweetManager = (props: any) => {
  const [ visible, setVisible] = useState<boolean>(false);

  const onModalClicked = () => {
    setVisible(true);
    console.log('modal clicked!');
  }

  const onConfirm = () => {
    setVisible(false);
  }

  const onDismiss = () => {
    setVisible(false);
  }
 
  return (
    <div>
      <ComposerAffix onClick={onModalClicked}></ComposerAffix>
      <EmptyTweetIndicator onClick={onModalClicked}></EmptyTweetIndicator>
      <ComposerModal isVisible={visible} onConfirm={onConfirm} onDismiss={onDismiss}></ComposerModal>
    </div>
  )
}
export default TweetManager;
