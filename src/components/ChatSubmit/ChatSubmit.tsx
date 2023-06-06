import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import classes from './ChatSubmit.module.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { Socket } from 'socket.io-client';

interface ChatSubmitProps {
    roomName: string;
    socket: Socket;
}

/**
 * Este es un componente funcional en TypeScript React que representa un formulario para enviar
 * mensajes de chat con una conexión de socket.
 * @param  - - `roomName`: una cadena que representa el nombre de la sala de chat donde se enviará el
 * mensaje.
 * @returns Se devuelve el componente `ChatSubmit`, que es un formulario con un campo de entrada y un
 * botón de envío. Cuando se envía el formulario, emite un evento de mensaje al socket con el texto del
 * mensaje, el nombre de usuario, la ID del socket y el nombre de la sala. El valor del campo de
 * entrada está controlado por la variable de estado `message`, que se actualiza cuando el usuario
 * escribe en el campo de entrada.
 */
const ChatSubmit: React.FC<ChatSubmitProps> = ({ roomName, socket }) => {
    const [message, setMessage] = useState("")

    /**
     * Esta función actualiza el estado de una variable de mensaje en función del valor de un evento de
     * entrada.
     * @param event - El parámetro de evento es del tipo IonInputCustomEvent, que es un tipo de evento
     * personalizado definido por el marco Ionic. Representa un evento que se activa cuando cambia el
     * valor de un elemento de entrada.
     */
    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setMessage(event.detail.value ?? "");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() && localStorage.getItem("userName")) {
            socket.emit("message",
                {
                    text: message,
                    name: localStorage.getItem("userName"),
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                    room: roomName,
                }
            )
        }
        setMessage('');
    };

    return (
        <form onSubmit={onSubmit} className={classes.formSubmit}>
            <IonGrid>
                <IonRow>
                    <IonCol size='9'>
                        <IonInput
                            value={message}
                            onIonChange={handleChange}
                            style={{ flex: 1, fontSize: 18, backgroundColor: 'white', color: 'black' }}
                            placeholder="Escribe aquí..."
                        />
                    </IonCol>
                    <IonCol size='3'>
                        <IonButton expand="full" color="danger" className={classes.buttonSubmit} type="submit">
                            Enviar
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
};

export default ChatSubmit;
