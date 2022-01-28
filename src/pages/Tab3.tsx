import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import './Tab3.css';


const Tab3: React.FC = () => {
  const history = useHistory();
  const [excuse, setExcuse] = useState();
  const [joke, setJoke] = useState();
  const [quote, setQuote] = useState();

  const getExcuse = () => {
    const options = { 
      method: 'GET', 
    }
    fetch(' https://excuser.herokuapp.com/v1/excuse', options)
      .then(response => response.json())
      .then(response => setExcuse(response[0].excuse))
    console.log(excuse)
    return excuse
  }

  const getJoke = () => {
    const options = { 
      method: 'GET', 
      headers: {
        "Accept" : "application/json" 
      }
    }
    fetch('https://icanhazdadjoke.com/', options)
      .then(response => response.json())
      .then(response => setJoke(response.joke))
    console.log(joke)
    return joke
  }

  const getQuote= () => {
    const options = { 
      method: 'GET', 
      headers: {
        "Accept" : "application/json" 
      }
    }
    fetch('https://friends-quotes-api.herokuapp.com/quotes/random', options)
      .then(response => response.json())
      .then(response => setQuote(response.quote))
    return quote
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Procrastination</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Procrastination</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Excuse: {excuse}</p>
        <IonButton onClick={(e) => setExcuse(getExcuse())}>Get Excuse</IonButton>
        <p>Dad Joke: {joke}</p>
        <IonButton onClick={(e) => setJoke(getJoke())}>Get Joke</IonButton>
        <p>Friends Quote: {quote}</p>
        <IonButton onClick={(e) => setQuote(getQuote())}>Get Quote</IonButton>
      </IonContent>
      <IonButton onClick={(e) => history.push('/tab2')}>Back</IonButton>        

    </IonPage>
  );
};

export default Tab3;
