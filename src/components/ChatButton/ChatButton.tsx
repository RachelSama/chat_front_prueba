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

/**
 * Este es un componente de React que maneja la apertura y el cierre de una ventana de chat, verifica
 * los datos de usuario almacenados e inicia sesión en el usuario si está disponible.
 * @param {Props}  - - isOpen: un valor booleano que indica si la ventana de chat está actualmente
 * abierta o cerrada
 * @returns Se devuelve el componente ChatButton.
 */
function ChatButton({ isOpen, onOpen, onClose, socket }: Props) {
  const history = useHistory();

  /**
   * Esta función maneja el evento de clic para abrir o cerrar una ventana de chat, verificar los datos
   * de usuario almacenados e iniciar sesión si está disponible.
   */
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
