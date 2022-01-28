import { IonButton, IonInput } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";

const Register: React.FC = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    console.log(email);
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (user) {
        return history.push('/tab1')
    }
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <IonInput
          type="text"
          className="register__textBox"
          value={name}
          onIonChange={(e: any) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <IonInput
          type="text"
          className="register__textBox"
          value={email}
          onIonChange={(e: any) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <IonInput
          type="password"
          className="register__textBox"
          value={password}
          onIonChange={(e: any) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <IonButton className="register__btn" onClick={register}>
          Register
        </IonButton>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;