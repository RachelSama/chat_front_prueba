import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatRedirectHome from '../ChatRedirectHome/ChatRedirectHome';
import classes from './HeaderChat.module.css';
import ChatLeave from '../ChatLeave/ChatLeave';

/** 
 * Este es un componente funcional en TypeScript React que representa el encabezado de una interfaz de
 * chat. Toma un único accesorio `isTyping`, que es un valor booleano que indica si el chatbot está
 * generando una respuesta o no, y una función `setIsTyping` que actualiza el valor de `isTyping`. El
 * componente devuelve un elemento JSX que muestra la imagen, el nombre y el estado del chatbot (ya sea
 * "generando respuesta" o "esperando consulta"), así como dos botones para redirigir a la página de
 * inicio y abandonar el chat, respectivamente. 
 */

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
                <IonCol size='2'>
                    <Router>
                        <ChatLeave />
                    </Router>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default HeaderChat;
