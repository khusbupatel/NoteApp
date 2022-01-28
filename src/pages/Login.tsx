import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { IonButton, IonInput } from "@ionic/react";

const Login: React.FC = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();


  useEffect(() => {
    if (user) {
      return history.push('/tab1')
    }
  }, [user, loading]);
  if (user) {
    <Redirect to='/tab1'/>
  }
  return (
    <div className="login">
      <div className="login__container">
        <IonInput
          type="text"
          className="login__textBox"
          value={email}
          onIonChange={(e: any) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <IonInput
          type="password"
          className="login__textBox"
          value={password}
          onIonChange={(e: any) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <IonButton
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </IonButton>
        <IonButton className="login__btn" onClick={signInWithGoogle}>
          Login with Google
        </IonButton>
        <div>
         <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;