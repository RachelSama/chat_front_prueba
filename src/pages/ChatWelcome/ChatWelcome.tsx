import React from 'react';
import classes from './ChatWelcome.module.css'
import { IonButton, IonCol, IonGrid, IonPage, IonRow } from '@ionic/react';
import HeaderWelcome from '../../components/HeaderWelcome/HeaderWelcome';
import { useHistory } from "react-router-dom";


function ChatWelcome() {
  const history = useHistory();

  const handleClick = (topic: string) => {
    history.push(`/chat/${topic}`);
  };

  return (
    <IonPage style={{ display: 'block'}}>
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
