import { IonCard, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import classes from './ChatMessageList.module.css';
import { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

interface Message {
  user: string;
  text: string;
  timestamp: string;
}

interface ChatMessageListProps {
  roomName: string;
  socket: Socket;
}

/**
 * Este es un componente funcional de React que muestra una lista de mensajes de chat con marcas de
 * tiempo y permite desplazarse hasta el último mensaje.
 * @param {string} timestamp - El parámetro `timestamp` es una cadena que representa una fecha y hora
 * en un formato específico, como "2021-10-15T14:30:00Z". Se usa como entrada para la función
 * `formatDateTime` para formatear la fecha y la hora de una manera específica.
 * @returns Se devuelve el componente `ChatMessageList`, que muestra una lista de mensajes de chat con
 * marcas de tiempo e información del usuario. Los mensajes se recuperan del estado `messages`
 * utilizando el enlace `useState` y se actualizan cuando se recibe el evento `roomData` desde el
 * `socket` utilizando el enlace `useEffect`. La función `formatDateTime` se usa para formatear las
 * marcas de tiempo de los mensajes
 */
const ChatMessageList: React.FC<ChatMessageListProps> = ({ roomName, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    socket.emit('getRoomData', roomName);
    socket.on("roomData", (data: Message[]) => {
      setMessages(data)
    });
  }, [roomName, socket, messages]);
  
    useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

  /**
   * La función formatea una marca de tiempo determinada en una cadena con la fecha y la hora en un
   * formato específico.
   * @param {string} timestamp - El parámetro `timestamp` es una cadena que representa una fecha y hora
   * en un formato específico, como "2021-10-15T14:30:00Z".
   * @returns La función `formatDateTime` devuelve una cadena de fecha y hora formateada en el formato
   * "DD/MM/YYYY HH:MM". Se espera que el parámetro de entrada `timestamp` sea una cadena que
   * represente una fecha y hora válidas.
   */
  function formatDateTime(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <IonCard className={classes.cardChat}>
      <IonContent>
        <IonGrid>
          <div className={classes.messageContainer}>
            {messages.map((message, index) => {
              const formattedDateTime = formatDateTime(message.timestamp);

              return message.user === 'Unobike' ? (
                <IonRow className={classes.messageRow} key={index}>
                  <IonCol>
                    <IonRow style={{ flexDirection: 'row' }}>
                      <div className={classes.messageCol}>{message.user}</div>
                    </IonRow>
                    <IonRow style={{ flexDirection: 'row' }}>
                      <div
                        className={classes.messageCol}
                        style={{
                          backgroundColor: '#ac3939',
                          color: 'white',
                        }}
                      >
                        <p>{message.text}</p>
                        <p className={classes.message__timestamp}>{formattedDateTime}</p>
                      </div>
                    </IonRow>
                  </IonCol>
                </IonRow>
              ) : (
                <IonRow className={classes.messageRow} key={index}>
                  <IonCol>
                    <IonRow style={{ flexDirection: 'row-reverse' }}>
                      <div className={classes.messageCol}>Tú</div>
                    </IonRow>
                    <IonRow style={{ flexDirection: 'row-reverse' }}>
                      <div
                        className={classes.messageCol}
                        style={{
                          backgroundColor: '#c5c5c5',
                          color: 'black',
                        }}
                      >
                        <p>{message.text}</p>
                        <p className={classes.message__timestamp}>{formattedDateTime}</p>
                      </div>
                    </IonRow>
                  </IonCol>
                </IonRow>
              );
            })}
          </div>
        </IonGrid>
        <div ref={lastMessageRef} />
      </IonContent>
    </IonCard>
  );
};

export default ChatMessageList;
