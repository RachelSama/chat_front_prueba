import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importar Router
import ChatRedirectHome from '../ChatRedirectHome/ChatRedirectHome';
import classes from './HeaderChat.module.css';

function HeaderChat(props: {isTyping: boolean, setIsTyping: (value: boolean) => void}) {
    return (
        <Router>
            <IonGrid className={classes.backgroundHeader}>
                <IonRow>
                    <IonCol size="2">
                        <img src="./assets/images/robotFace.png" alt="Imagen del robot" className={classes.imageRobot} />
                        <div className={classes.inLine}></div>
                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <h4>Baiki, soporte de Unobike</h4>
                        </IonRow>
                        <IonRow>
                            {props.isTyping && ( <h6>generando respuesta...</h6> )}

                            {!props.isTyping && ( <h6>esperando consulta</h6> )}
                        </IonRow>
                    </IonCol>
                    <IonCol size='2'>
                        <ChatRedirectHome />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </Router>
    );
}

export default HeaderChat;
