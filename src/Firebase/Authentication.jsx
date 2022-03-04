import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import appRef, { auth } from "./Firebase";

export const createAnAccount = async (signupData) => {
  let catchErr = "none";
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signupData.email,
      signupData.password
    );

    // update profile bcz we need to store user name in auth object
    updateProfile(auth.currentUser, { displayName: signupData.username });

    // Store verification status into a user_verification_status. default value false
    await appRef
      .child(`user_verification_status/${userCredential.user.uid}`)
      .set({ verification_status: false });

    // send verificarion mail using nodejs_backend
    const verificationDetails = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...signupData, uid: userCredential.user.uid }),
    };

    await fetch("/sendVerificationMail", verificationDetails);
    return "none";
  } catch (error) {
    catchErr = "Email-already-in-use";
  }

  return catchErr;
};

export const login = async ( loginData) => {
  let loginError = "none";

  try {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

    return "none";
  } catch (error) {
    loginError = error;
    // console.log(error);
  }

  return loginError;
};
