import axios from 'axios';
import { IonCol, IonContent, IonGrid, IonPage, IonRow, IonToolbar } from '@ionic/react';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './ChatWindow.module.css'

import HeaderChat from '../../components/HeaderChat/HeaderChat';
import ChatMessageList from '../../components/ChatMessageList/ChatMessageList';
import ChatSubmit from '../../components/ChatSubmit/ChatSubmit';

function ChatWindow() {
    const [messages, setMessages] = useState<{ message: string; isBot: boolean; }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { topic } = useParams<{ topic: string }>();
    let welcomeBot = 0;

    // Obtener las constantes del archivo .env
    const BASE_URL = process.env.BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const USER_ID = process.env.USER_ID;

    // Crear una función que envíe la petición para crear una sala de chat
    const createChatRoom = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/_matrix/client/r0/createRoom`, {
                preset: "chatbot", //public_chat
                room_alias_name: "chatbot", //nombre-de-la-sala
                topic: "chatbot" //tema-de-la-sala
            }, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                },
                params: {
                    access_token: ACCESS_TOKEN
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (welcomeBot === 0 && messages.length === 0) {
            const botMessage = { message: sendMessage(topic), isBot: true };
            setMessages(prevMessages => [...prevMessages, botMessage]);
            welcomeBot++;
        }
        // Hacer scroll hacia abajo cuando se agregue un nuevo mensaje
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    }, [topic, welcomeBot, messages]);

    const handleSubmit = (message: string) => {
        const newMessages = [...messages, { message, isBot: false }];

        setMessages(newMessages);
        setIsTyping(true);

        setTimeout(() => {
            const botMessage = { message: sendMessage(topic), isBot: true };
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
        <IonPage style={{ display: 'block' }}>
            <IonGrid>
                <IonRow>
                    <IonCol sizeXs='12' sizeSm='8' sizeMd='6' sizeLg='5' sizeXl='3.5'>
                        <div className={classes.chatContent}>
                            <IonToolbar>
                                <HeaderChat isTyping={isTyping} setIsTyping={setIsTyping} />
                            </IonToolbar>
                            <div className={classes.chatContentMessages}>
                                <ChatMessageList messages={messages} />
                                <div ref={messagesEndRef} />
                            </div>
                            <ChatSubmit handleSubmit={handleSubmit} />
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
}

export default ChatWindow;