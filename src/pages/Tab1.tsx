import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonTextarea } from '@ionic/react';
import './Tab1.css';
import firebase from './firebase';

const Tab1: React.FC = () => {
  const [text, setText] = useState<string>();
  const addNote = () => {
    firebase
      .firestore()
      .collection("notes")
      .add({text});
      setText("");
    console.log("here")
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
          <IonTextarea autoGrow value={text} placeholder="Enter Note here" onIonChange={e => setText(e.detail.value!)}></IonTextarea>
          <IonButton onClick={addNote}>Submit</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
