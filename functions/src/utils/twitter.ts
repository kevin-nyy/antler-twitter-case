import { TwitterApi } from 'twitter-api-v2';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import axios from 'axios';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import { finished as streamFinished } from 'stream';


type TwitterCreds = {
  API_KEY: string,
  API_KEY_SECRET: string,
  BEARER_TOKEN: string,
  ACCESS_TOKEN: string,
  ACCESS_TOKEN_SECRET: string,
}

interface publishTweetData {
  body: string;
  mediaId?: string | null;
}

const finished = promisify(streamFinished);
const SECRET_NAME = 'projects/92958032684/secrets/TWITTER/versions/latest';

export const getClient = async () => {
  const client = new SecretManagerServiceClient();
  // Access the secret.
  const [accessResponse] = await client.accessSecretVersion({
    name: SECRET_NAME,
  });

  const secret = accessResponse?.payload?.data;
  if (secret == null) {
    throw ('Error: Unable to retrieve Twitter credentials.');
  }
  const creds: TwitterCreds = JSON.parse(secret.toString());
  const twitterClient = new TwitterApi({
    appKey: creds.API_KEY,
    appSecret: creds.API_KEY_SECRET,
    accessToken: creds.ACCESS_TOKEN,
    accessSecret: creds.ACCESS_TOKEN_SECRET,
  });
  if (!twitterClient) {
    throw ('Error: Twitter client init failed.');
  }
  return twitterClient;
};

export const publishTweet = async (client: TwitterApi, data: publishTweetData) => {
  const { body, mediaId } = data;
  client?.readWrite; // set api level on client side (typeguard)
  await client.v2.tweet(
    body,
    {
      media: mediaId ? {
        media_ids: [mediaId]
      } : undefined,
    });
}

// NOTE: requires twitter elevated api to access v1.1 endpoints
export const uploadMediaFromUrl = async (client: TwitterApi, mediaUrl: string, name?: string) => {
  const fileName = name ? name : mediaUrl.split('/').pop()?.split('#')[0].split('?')[0] || 'temp';
  const filePath = `/tmp/${fileName}`;
  const writer = createWriteStream(filePath);
  // const response = await axios/fetch(mediaUrl);

  const response = await axios({
    method: 'get',
    url: mediaUrl,
    responseType: 'stream'
  });
  response.data.pipe(writer);
  await finished(writer)
  client?.readWrite; // set api level on client side (typ eguard)
  const id = await client.v1.uploadMedia(filePath)
  return id;
}
