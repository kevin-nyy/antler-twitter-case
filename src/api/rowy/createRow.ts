import { Timestamp } from '@google-cloud/firestore';
import axios, { AxiosResponse } from 'axios';
import { User } from 'firebase/auth';

export type Media = {
  name: string;
  downloadURL: string;
  lastModifiedTS: number;
  ref: string;
}[]

type Payload = {
  message: string | null,
  media: Media | null,
  _createdBy: {
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    isAnonymous: boolean,
    photoURL: string | null,
    uid: string,
    timestamp: number
  }
}

const createRow = (token: User, payload: Payload) => {
  return axios({
    method: 'post',
    url: process.env.REACT_APP_ENDPOINT_ROWY_CREATE_ROW,
    data: payload,
    headers: { Authorization: `Bearer ${(token as any).accessToken}` }
  });
};

export default createRow;


