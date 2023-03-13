import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';

import classes from './ChatWindow.module.css'

import HeaderChat from '../../components/HeaderChat/HeaderChat';
import ChatMessageList from '../../components/ChatMessageList/ChatMessageList';
import ChatSubmit from '../../components/ChatSubmit/ChatSubmit';

interface ChatWindowProps {
    selectedOption: string;
}

function ChatWindow(props: ChatWindowProps) {
    const { selectedOption } = props;
    const [messages, setMessages] = useState<{ message: string; isBot: boolean; }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    let welcomeBot = 0;

    useEffect(() => {
        if (welcomeBot === 0 && messages.length === 0) {
            const botMessage = { message: sendMessage(selectedOption), isBot: true };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            welcomeBot++;
        }
        // Hacer scroll hacia abajo cuando se agregue un nuevo mensaje
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [selectedOption, welcomeBot, messages]);

    const handleSubmit = (message: string) => {
        const newMessages = [...messages, { message, isBot: false }];

        setMessages(newMessages);
        setIsTyping(true);

        setTimeout(() => {
            const botMessage = { message: sendMessage(selectedOption), isBot: true };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            setIsTyping(false);
        }, 2000);
    };


    const sendMessage = (selectedOption: string) => {
        let response = '';

        switch (selectedOption) {
            case 'compra':
                response = 'Parece que necesitas ayuda para comprar un articulo, ¿Qué es lo que estas buscando?';
                break;
            case 'pedido':
                response = 'Para consultar el estado de tu pedido, por favor indique el número de seguimiento.';
                break;
            case 'iformacion':
                response = '¿Que información puedo ofrecerte?';
                break;
            default:
                response = 'Hola, soy Baiki, tu soporte personal de Unobike. ¿En qué puedo ayudarte?';
        }

        return response;
    };

    return (
        <IonPage className={classes.pageChat}>

            <IonContent>
                <IonToolbar>
                    <HeaderChat isTyping={isTyping} setIsTyping={setIsTyping} />
                </IonToolbar>
                <ChatMessageList messages={messages} />
                <div ref={messagesEndRef} />

            </IonContent>
            <ChatSubmit handleSubmit={handleSubmit} />

        </IonPage>
    );
}

export default ChatWindow;