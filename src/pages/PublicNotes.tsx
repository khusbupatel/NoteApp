import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import firebase from './firebase';
import { useHistory } from 'react-router-dom';

const PublicNotes: React.FC = () => {
  const [lists, setLists] = useState<firebase.firestore.DocumentData>([]);
  const history = useHistory();


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
    console.log(lists)
    
  },[]);

  const handleOnDelete = (id: string) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .delete();
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>View Public Notes</IonTitle>
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
              <p>{list.note}</p>
              <div className='buttons'>
              <IonButton className='delete' onClick={() => handleOnDelete(list.id)}>Delete</IonButton>
              </div>
            </div>
          ))}
     </div>
      </IonContent>
      <IonButton onClick={(e) => history.push('/tab3')}>Next</IonButton>
      <IonButton onClick={(e) => history.push('/tab2')}>Back</IonButton>
    </IonPage>
  );
};

export default PublicNotes;
