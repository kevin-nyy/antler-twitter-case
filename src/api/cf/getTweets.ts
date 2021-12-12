import axios, { AxiosResponse } from 'axios';

type Tweet = {
  id: string,
  text: string,
}

export type GetTweetsResponse = Tweet[];

const getTweets = () => {
  return axios({
    method: 'get',
    url: process.env.REACT_APP_ENDPOINT_GET_TWEETS,
  }).then((response: AxiosResponse) => {
    return response?.data as GetTweetsResponse;
  }).catch((err) => {
    console.error(`GetTweets API Error: ${err}`);
    return [];
  });
};

export default getTweets;