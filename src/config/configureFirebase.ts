import { UploadFile } from 'antd/lib/upload/interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyC1pfF-qckF3YtfyKR38BaDAt_rv2Xs0OE",
    authDomain: "antler-twitter-app.firebaseapp.com",
    projectId: "antler-twitter-app",
    storageBucket: "antler-twitter-app.appspot.com",
    messagingSenderId: "92958032684",
    appId: "1:92958032684:web:9ddde12f97b44da9be6289"
};
const firebaseInstance = firebase.initializeApp(firebaseConfig);
export default firebaseInstance;

export const uploadToFirebaseStorage = async (file: any) => {
    const storage = getStorage();
    const filename = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `twitter/${filename}`);
    // 'file' comes from the Blob or File API
    const buffer = await file.arrayBuffer();
    const result = await uploadBytes(storageRef, buffer, {
        contentType: file.type
    });
    
    return result;
}

export const getFirebaseStorageObjectUrl = (bucket: string, fullPath: string) => {
    return `https://storage.googleapis.com/${bucket}/${fullPath}`
}