import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import firebase from './firebase';

function useLists() {
  const [lists, setLists] = useState<firebase.firestore.DocumentData>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((snapshot) => {
        const lists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLists(lists)
      })
  }, []);

  return lists;
}

const Tab2: React.FC = () => {
  const lists = useLists()

  const handleOnDelete = (id: string) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .delete();
  };

  const handleOnUpdate = (id: string, note: string)  => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .set({text: note});
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div  className='notesDisplay'>
          {lists.map((list: firebase.firestore.DocumentData, index: number) => (
            <div key = {index} className='noteItem'>
              <IonTextarea value={list.text} onIonChange={e => handleOnUpdate(list.id, e.detail.value!)}></IonTextarea>
              <div className='buttons'>
              <IonButton className='delete' onClick={() => handleOnDelete(list.id)}>Delete</IonButton>
              </div>
            </div>
          ))}
     </div>
     {/* <IonButton onClick={e => window.location.reload()}>Refresh</IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
