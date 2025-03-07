import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl3_9eNpsrbTtaEPZJxgJW07RmyPICu2w",
  authDomain: "eccomerce-7625f.firebaseapp.com",
  projectId: "eccomerce-7625f",
  storageBucket: "eccomerce-7625f.firebasestorage.app",
  messagingSenderId: "863101374353",
  appId: "1:863101374353:web:fbf4a07cd48b0c699fd430"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);