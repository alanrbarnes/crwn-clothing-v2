import { initializeApp } from "firebase/app";    
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc

} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbyod9CSzHorH1h5JcDahTvPGNfY6oCi4",
  authDomain: "crwn-clothing-db-dea8a.firebaseapp.com",
  projectId: "crwn-clothing-db-dea8a",
  storageBucket: "crwn-clothing-db-dea8a.appspot.com",
  messagingSenderId: "367905226231",
  appId: "1:367905226231:web:a6ccc4b15b1f2da78e02f2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); //changed name

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"   //allways force users to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();  //add database to pass auth

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);   //check for existing document reference

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); 
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists())
  {
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists

  //return userDocRef
  return userDocRef;

}