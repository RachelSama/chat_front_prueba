import React from 'react';
import classes from './ChatWelcome.module.css'
import { IonButton, IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import HeaderWelcome from '../../components/HeaderWelcome/HeaderWelcome';
import { useHistory } from "react-router-dom";

import { Socket } from 'socket.io-client';

interface ChatWelcomeProps {
  socket: Socket;
}

/**
 * Este es un componente funcional en TypeScript React que muestra una pantalla de bienvenida de chat
 * con tres botones para diferentes temas. Toma un accesorio `socket` de tipo `Socket` y usa el gancho
 * `useHistory` de `react-router-dom` para manejar la navegación a diferentes temas de chat cuando se
 * hace clic en un botón. El componente devuelve un elemento JSX que muestra la pantalla de bienvenida
 * del chat con los tres botones.
 */
const ChatWelcome: React.FC<ChatWelcomeProps> = ({ socket }) => {
  const history = useHistory();

  /**
   * La función handleClick envía una nueva URL al historial del navegador con un parámetro de tema
   * específico.
   * @param {string} topic - El parámetro `topic` es una cadena que representa el tema de una
   * conversación de chat. Se usa en la función `handleClick` para navegar a una sala de chat
   * específica según el tema seleccionado.
   */
  const handleClick = (topic: string) => {
    history.push(`/chat/${topic}`);
  };

  return (
    <IonPage style={{ display: 'block' }}>
      <IonGrid>
        <IonRow>
          <IonCol sizeXs='12' sizeSm='8' sizeMd='6' sizeLg='5' sizeXl='3.5'>
            <div className={classes.chatContent}>
              <HeaderWelcome />
              <div className={classes.redBackground}>
                <IonGrid>
                  <IonRow className="ion-text-center">
                    <IonCol>
                      <h2>¿En qué te puedo ayudar?</h2>
                    </IonCol>
                  </IonRow>
                  <IonRow className={classes.buttonContent}>
                    <IonGrid class='ion-padding'>
                      <IonRow>
                        <IonCol>
                          <IonButton color="light" size="large" onClick={() => handleClick('compra')}>
                            Asistencia de compra
                          </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton color="light" size="large" onClick={() => handleClick('pedido')}>
                            Estado de pedido
                          </IonButton>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonButton color="light" size="large" onClick={() => handleClick('informacion')}>
                            Información
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonRow>
                </IonGrid>
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
}

export default ChatWelcome;
