import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatRedirectHome from '../ChatRedirectHome/ChatRedirectHome';
import classes from './HeaderChat.module.css';

function HeaderChat(props: { isTyping: boolean, setIsTyping: (value: boolean) => void }) {
    return (
        <IonGrid className={classes.backgroundHeader}>
            <IonRow>
                <IonCol size='2.5'>
                    <img src="./assets/images/robotFace.png" alt="Imagen del robot" className={classes.imageRobot} />
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol size='auto'>
                            <h4>Baiki, soporte de Unobike</h4>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='auto'>
                            {props.isTyping && (<h6>generando respuesta...</h6>)}
                            {!props.isTyping && (<h6>esperando consulta</h6>)}
                        </IonCol>
                    </IonRow>
                </IonCol>
                <IonCol size='2'>
                    <Router>
                        <ChatRedirectHome />
                    </Router>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default HeaderChat;
