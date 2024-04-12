import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect  //added to bring in google redirect
 } from '../../utils/firebase/firebase.utils';

 import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    const logGoogleUser = async () => {
        // const response = await signInWithGooglePopup();
        // console.log(response);
        const {user}  = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;