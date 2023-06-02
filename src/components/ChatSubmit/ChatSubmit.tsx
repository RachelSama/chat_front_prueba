import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import classes from './ChatSubmit.module.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { Socket } from 'socket.io-client';

interface ChatSubmitProps {
    roomName: string;
    socket: Socket;
}

const ChatSubmit: React.FC<ChatSubmitProps> = ({ roomName, socket }) => {
    const [message, setMessage] = useState("")

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
