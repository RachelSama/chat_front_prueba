import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/react';
import classes from './ChatSubmit.module.css'
import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';


interface ChatSubmitProps {
    handleSubmit: (message: string) => void;
}

const ChatSubmit: React.FC<ChatSubmitProps> = ({ handleSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setInputValue(event.detail.value ?? "");
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={onSubmit} className={classes.formSubmit}>
            <IonGrid>
                <IonRow>
                    <IonCol size='9'>
                        <IonInput
                            value={inputValue}
                            onIonChange={handleChange}
                            style={{ flex: 1, fontSize: 18, padding: 10 }}
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
