import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDZXFsVc_n6YAz9oSuMJm3tXczTBnh_dQ8",
	authDomain: "clone-41ef3.firebaseapp.com",
	projectId: "clone-41ef3",
	storageBucket: "clone-41ef3.appspot.com",
	messagingSenderId: "260350998798",
	appId: "1:260350998798:web:b88d389c9b92d0319dbf5f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export default { db };
