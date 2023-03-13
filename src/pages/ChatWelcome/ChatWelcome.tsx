import React from 'react';
import classes from './ChatWelcome.module.css'

import { IonButton, IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import HeaderWelcome from '../../components/HeaderWelcome/HeaderWelcome';

interface Props {
  handleOptionSelect: (option: string) => void;
}

function ChatWelcome(props: Props) {
  const { handleOptionSelect } = props;

  const handleClick = (topic: string) => {
    handleOptionSelect(topic);
  };

  return (
    <IonPage className={classes.chatContainer}>
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
                  <IonButton color="light" size="large"  onClick={() => handleClick('compra')}>
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
    </IonPage>
  );
}

export default ChatWelcome;
