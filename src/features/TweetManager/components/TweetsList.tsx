

import { css } from 'emotion';
import { GetTweetsResponse } from '../../../api/cf/getTweets';
import { IAsyncState } from '@react-hookz/web';
import { Avatar, List } from 'antd';

const styles = {
  links: css({
    color: 'rgb(29, 155, 240) !important',
  }),
}

interface TweetsListProps {
  state: IAsyncState<GetTweetsResponse | never[]>;
}

const TweetsList = (props: TweetsListProps) => {
  const { state } = props;

  return (<List
    loading={state.status === 'loading'}
    itemLayout="horizontal"
    dataSource={state.result}
    renderItem={(item) => {
      const username = process.env.REACT_APP_TWITTER_USERNAME;
      const twitterLink = process.env.REACT_APP_TWITTER_LINK;
      return (
        <List.Item>
          <List.Item.Meta
            avatar={(
              <Avatar>{username?.charAt(0)?.toUpperCase()}</Avatar>
            )}
            title={(
              <a
                className={styles.links}
                href={`${twitterLink}${username}`}
                target='_blank'
              >
                {username}
              </a>
            )}
            description={item.text}
          />
        </List.Item>
      )
    }}
  />)
}
export default TweetsList;
