import { initializeApp } from "firebase/app";    
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, //added
    FacebookAuthProvider //add for facebook authentication
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

const googleProvider = new GoogleAuthProvider();  //change variable to googleProvider

googleProvider.setCustomParameters({  //change variable to googleProvider
    prompt: "select_account"   //allways force users to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);  //change variable to googleProvider

//added to implement signInWithRedirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);  //change variable to googleProvider

export const db = getFirestore();  //add database to pass auth

export const createUserDocumentFromAuth = async(
      userAuth, 
      additionalInformation = {}
    ) => {
  if (!userAuth) return; //added

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
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists

  //return userDocRef
  return userDocRef;

};

//added
export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}