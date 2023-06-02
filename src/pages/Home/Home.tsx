import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonLabel, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import classes from './Home.module.css'
import HeaderChat from '../../components/HeaderChat/HeaderChat';

const Home: React.FC<{ socket: any }> = ({ socket }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      localStorage.setItem('userName', username);
      // Realizar la consulta a la base de datos para verificar el usuario y la contraseña
      const data = {
        username: username,
        password: password
      };
      socket.emit('login', data);

      socket.on("roomToGetMessages", (roomName: string) => {
        localStorage.setItem('roomName', roomName);
      })

      socket.on('localStorageToken', (token: string) => {
        localStorage.setItem('token', token);
      });
      history.push("/chat");
    }
  };

  return (
    <IonPage style={{ display: 'block' }}>
      <IonGrid>
        <IonRow>
          <IonCol sizeXs='12' sizeSm='8' sizeMd='6' sizeLg='5' sizeXl='3.5'>
            <div className={classes.chatContent}>
              <IonToolbar>
                <HeaderChat isTyping={isTyping} setIsTyping={setIsTyping} />
              </IonToolbar>
              <form className={classes.home__container} onSubmit={handleSubmit}>
                <IonGrid>
                  <IonRow>
                    <h2 className={classes.home__header}>Inicia sesión en Open Chat</h2>
                  </IonRow>
                  <IonRow>
                    <IonLabel position="stacked">Nombre de usuario</IonLabel>
                    <IonInput
                      type="text"
                      minlength={6}
                      name="username"
                      id="username"
                      className={classes.username__input}
                      value={username}
                      onIonChange={(e: any) => setUsername(e.detail.value)}
                    />
                  </IonRow>
                  <IonRow>
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput
                      type="password"
                      minlength={6}
                      name="password"
                      id="password"
                      className={classes.password__input}
                      value={password}
                      onIonChange={(e: any) => setPassword(e.detail.value)}
                    />
                  </IonRow>
                  <IonRow>
                    <IonButton type="submit">
                      INICIAR SESIÓN
                    </IonButton>
                  </IonRow>
                </IonGrid>
              </form>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Home;
