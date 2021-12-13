import { getClient, publishTweet, uploadMediaFromUrl } from './utils/twitter';
import callableAction from "rowy-actions";
import * as functions from "firebase-functions";
import cors from './utils/cors';

const admin = require('firebase-admin');
admin.initializeApp()

type RowyImage = {
  downloadURL: string;
  name: string;
  lastModifiedTS: number,
  ref: string,
}

type RowyRow = {
  message: string;
  media: RowyImage[];
}

export const PublishTweet = callableAction(async ({ row, callableData }) => {
  const { action } = callableData;
  const { message, media: mediaList } = row as RowyRow;
  const [media] = mediaList || [];
  try {
    const twitterClient = await getClient();
    twitterClient?.v1.uploadMedia
    switch (action) {
      case "run":
      case "redo":
        const mediaId = media ? await uploadMediaFromUrl(twitterClient, media.downloadURL, media.name) : null;
        await publishTweet(twitterClient, {
          body: message,
          mediaId,
        });
        return {
          success: true,
          message: "Published Tweet.",
          status: "Published Tweet.",
          cellStatus: "Published",
          newState: "disabled", // redo, undo, disabled
        };
      case "undo":
      default:
    }
  } catch (e) {
    console.error(e);
  }

  return {
    success: false,
    message: "Error: Reached undefined state",
    cellStatus: "Retry",
    newState: "redo",
  };
});

export const GetTweets = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const TWITTER_ID = '1467405993692721152';
      const twitterClient = await getClient();
      const timelinePaginator = await twitterClient.v2.userTimeline(TWITTER_ID, { exclude: ['retweets', 'replies'], max_results: 10 });
      const { tweets } = timelinePaginator;
      res.send(tweets);
    } catch (e) {
      console.error(e);
      res.status(500).end(e);
    }
  })
})

// To prevent any unauthorized users which have not been manually added by the admin from accessing the application
export const DeleteAndRevokeSignups = functions.auth.user().onCreate( async (event: { uid: any; }) => {
  try {
    const { uid } = event;
    await admin.auth().revokeRefreshTokens(uid);
    await admin.auth().deleteUser(uid);
  } catch (e) {
    console.error("Error deleting user and revoking token:", e);
  }
});
