import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { app } from "../config/firebaseConfig";
export default function Login() {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(app));

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/home",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId: process.env.REACT_APP_FIREBASE_WEB_CLIENTID_KEY,
        },
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    });
  }, []);

  return (
    <div
      className="bg-slate-500 w-screen h-screen flex justify-center items-center"
      id="firebaseui-auth-container"
    >
      <h1 className="text-white relative left-2/4 bottom-36">Hello User.</h1>
    </div>
  );
}
