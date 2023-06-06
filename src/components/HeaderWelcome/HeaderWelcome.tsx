import { IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import classes from './HeaderWelcome.module.css'

/**
 * Esta es una función de TypeScript React que devuelve un componente de encabezado con un mensaje de
 * bienvenida y una imagen de un robot.
 * @returns Se devuelve el componente HeaderWelcome, que es un elemento JSX que contiene un IonGrid con
 * un IonRow y dos IonCols. El primer IonCol contiene una imagen de un robot y el segundo IonCol
 * contiene dos IonRows con un encabezado y un subencabezado.
 */
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
