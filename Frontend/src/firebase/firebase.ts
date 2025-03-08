// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const apiKey: string | undefined = process.env.REACT_APP_apiKey;
const authDomain: string | undefined = process.env.REACT_APP_authDomain;
const projectId: string | undefined = process.env.REACT_APP_projectId;
const storageBucket: string | undefined = process.env.REACT_APP_storageBucket;
const messagingSenderId: string | undefined = process.env.REACT_APP_messagingSenderId;
const appId: string | undefined = process.env.REACT_APP_appId;
const measurementId: string | undefined = process.env.REACT_APP_measurementId;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;