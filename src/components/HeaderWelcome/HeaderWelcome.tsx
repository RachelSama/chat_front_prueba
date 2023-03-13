import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import classes from './HeaderWelcome.module.css'

function HeaderWelcome() {
    return (
        <IonGrid class="ion-justify-content-center">
            <IonRow>
                <IonCol>
                    <img src="./assets/images/robot.png" alt="Imagen del robot" className={classes.imageRobot} />
                </IonCol>
                <IonCol>
                    <IonRow>
                        <h1>¡Bienvenido/a!</h1>
                    </IonRow>
                    <IonRow>
                        <h5>Soy Baiki, tu soporte personal de Unobike</h5>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default HeaderWelcome;
