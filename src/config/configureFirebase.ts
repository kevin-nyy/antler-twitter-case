import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

// export const firebaseUIConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   signInOptions: [
//     // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     // Avoid redirects after sign-in.
//     signInSuccessWithAuthResult: (config: any) => {
//       console.log('signed in!', config);
//       // No redirect URL has been found. You must either:
//       // 1. specify a signInSuccessUrl in the configuration
//       // 2. pass in a redirect URL to the widget URL
//       // 3. or return false from the callback
//       return false;
//     },
//   },
// };
