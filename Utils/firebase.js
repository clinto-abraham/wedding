import { getStorage } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    UserInfo,
} from "firebase/auth";


// import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyBTR8CQAmaiRg9JIL7vDuD67W6do6gaXlg",
    authDomain: "wedding-clinto-chippy.firebaseapp.com",
    databaseURL: "https://wedding-clinto-chippy-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wedding-clinto-chippy",
    storageBucket: "wedding-clinto-chippy.appspot.com",
    messagingSenderId: "487878075862",
    appId: "1:487878075862:web:577e81b48918844ecf7077",
    measurementId: "G-Q5GLV9TERS"

    // apiKey: process.env["API_KEY"],
    // authDomain: process.env["AUTH_DOMAIN"],
    // databaseURL: process.env["DATA_BASE_URL"],
    // projectId: process.env["PROJECT_ID"],
    // storageBucket: process.env["STORAGE_BUCKET"],
    // messagingSenderId: process.env["MESSAGING_SENDER_ID"],
    // appId: process.env["APP_ID"],
    // measurementId: process.env["MEASUREMENT_ID"]

};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// const storage = getStorage(app);
// Enable Firestore Cache
// storage.firestore()
//     .enablePersistence()
//     .catch((err) => {
//         console.error(err);
//     });


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};

export const storage = getStorage(appFirebase);;

