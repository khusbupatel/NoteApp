import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonTextarea } from '@ionic/react';
import './Tab1.css';
import firebase, { auth, logout } from './firebase';
import { Redirect, useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();
  const [publicText, setPublicText] = useState<string>();
  const [user, loading] = useAuthState(auth);
  const history = useHistory();


  useEffect(() => {
    if (loading) return;
    if (!user) {
     return history.push('/')
    }
    console.log(user.uid)
  }, [user, loading]);


  const addNote = () => {
    firebase
      .firestore()
      .collection("notesByUser")
      .add({note: text, user: user!.uid});
      setText("");
  }
  
  const addPublicNote = () => {
    firebase
      .firestore()
      .collection("notes")
      .add({note: publicText});
      setPublicText("");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='notes'>
          <IonTitle>Personal Note</IonTitle>
          <IonTextarea autoGrow value={text} placeholder="Enter Note here" onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          <IonButton onClick={addNote}>Submit</IonButton>
        </div>
        <div className='notes'>
          <IonTitle>Public Note</IonTitle>
          <IonTextarea autoGrow value={publicText} placeholder="Enter Note here" onIonChange={e => setPublicText(e.detail.value!)}></IonTextarea>
          <IonButton onClick={addPublicNote}>Submit</IonButton>
        </div>
      </IonContent>
      <IonButton onClick={(e) => history.push('/tab2')}>Next</IonButton>
      <IonButton onClick={logout}>LogOut</IonButton>
    </IonPage>
  );
};

export default Tab1;
