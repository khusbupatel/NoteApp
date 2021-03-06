import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import firebase, { auth } from './firebase';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Tab2: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [lists, setLists] = useState<firebase.firestore.DocumentData>([]);
  const history = useHistory();


  useEffect(() => {
    firebase
      .firestore()
      .collection("notesByUser")
      .onSnapshot((snapshot) => {
        const filter = snapshot.docs.filter((data) => {return data.data().user == user!.uid })
        const lists = filter.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLists(lists)
      })
    console.log(lists)
    
  },[]);

  const handleOnDelete = (id: string) => {
    firebase
      .firestore()
      .collection("notesByUser")
      .doc(id)
      .delete();
  };

  const handleOnUpdate = (id: string, note: string)  => {
    firebase
      .firestore()
      .collection("notesByUser")
      .doc(id)
      .set({note: note, user: user!.uid});
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Personal Notes</IonTitle>
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
              <IonTextarea value={list.note} onIonChange={e => handleOnUpdate(list.id, e.detail.value!)}></IonTextarea>
              <div className='buttons'>
              <IonButton className='delete' onClick={() => handleOnDelete(list.id)}>Delete</IonButton>
              </div>
            </div>
          ))}
     </div>
      </IonContent>
      <IonButton onClick={(e) => history.push('/publicNotes')}>Next</IonButton>
      <IonButton onClick={(e) => history.push('/tab1')}>Back</IonButton>
    </IonPage>
  );
};

export default Tab2;
