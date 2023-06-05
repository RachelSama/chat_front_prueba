import React from 'react';
import { IonFab, IonFabButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import classes from './ChatButton.module.css';
import { Socket } from 'socket.io-client';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  socket: Socket;
};

function ChatButton({ isOpen, onOpen, onClose, socket }: Props) {
  const history = useHistory();

  const handleClick = () => {
    if (isOpen) {
      history.push('/');
      console.log("cerrando ventana...")
      onClose();
    } else {
      const storedUuid = localStorage.getItem('uuid');
      if (storedUuid) {
        console.log("uuid guardado: " + storedUuid)
        // Realizar una solicitud a la base de datos para obtener el usuario y la contraseña asociados al uuid
        socket.emit('getUserData', storedUuid, (data: any) => {
          if (data && data.username && data.password) {
            const dataUser = {
              username: data.username,
              password: data.password
            }
            socket.emit("login", dataUser)
            history.push('/chat');
            console.log("abriendo ventana...")
            onOpen();
          }
        });
      } else {
        history.push('/login')
      }
    }
  };



  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end" className="ion-margin">
      <IonFabButton color="danger" onClick={handleClick} className={classes.chatButton}>
        {isOpen ? 'X' : '💬'}
      </IonFabButton>
    </IonFab>
  );
}

export default ChatButton;
