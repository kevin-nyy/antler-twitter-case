import EmptyTweetIndicator from './components/EmptyTweetIndicator';
import ComposerAffix from './components/ComposerAffix';
import { useState } from 'react';
import ComposerModal from './components/ComposerModal';
import { useAsync, useMountEffect } from '@react-hookz/web';
import getTweets from '../../api/cf/getTweets';
import TweetsList from './components/TweetsList';

const TweetManager = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  // Example: https://react-hookz.github.io/web/?path=/docs/side-effect-useasync--example
  const [getTweetsState, getTweetsMethods] = useAsync(
    getTweets,
    []
  );

  // async call to retrieve tweets
  useMountEffect(getTweetsMethods.execute);

  const onModalClicked = () => {
    setVisible(true);
  }

  const onConfirm = () => {
    setVisible(false);
  }

  const onDismiss = () => {
    setVisible(false);
  }

  const renderTweets = () => {
    if (getTweetsState.result.length === 0 && getTweetsState.status !== 'loading') {
      return (<EmptyTweetIndicator onClick={onModalClicked}></EmptyTweetIndicator>);
    }
    return (<TweetsList state={getTweetsState} />);
  }

  return (
    <div>
      <ComposerAffix onClick={onModalClicked}></ComposerAffix>
      {renderTweets()}
      <ComposerModal isVisible={visible} onConfirm={onConfirm} onDismiss={onDismiss}></ComposerModal>
    </div>
  )
}
export default TweetManager;
