import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';
import ChatButton from './components/ChatButton/ChatButton';
import ChatWelcome from './pages/ChatWelcome/ChatWelcome';
import ChatWindow from './pages/ChatWindow/ChatWindow';
import Home from './pages/Home/Home';
import socketIO from "socket.io-client"


setupIonicReact();

/**
 * Este es un componente funcional de React que representa una aplicación de chat con diferentes rutas
 * y una conexión de socket  utilizando la biblioteca socket.io-client y conectándola a un servidor que se ejecuta en
 * `http://localhost:4000`. Esta instancia de socket se puede utilizar para emitir y recibir eventos
 * entre el cliente y el servidor en tiempo real.
 * @returns Se devuelve el componente App, que es un componente funcional de React que representa un
 * componente IonApp del marco Ionic. El componente IonApp contiene un componente IonReactRouter que
 * configura el enrutamiento para la aplicación. El enrutamiento se define mediante el componente
 * IonRouterOutlet, que representa diferentes componentes en función de la ruta URL actual.
 */
const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const socket = socketIO("http://localhost:4000");

  /**
   * La función establece el estado de "isChatOpen" en verdadero.
   */
  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  /**
   * Esta función establece el estado de "isChatOpen" en falso.
   */
  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <ChatButton isOpen={isChatOpen} onOpen={handleChatOpen} onClose={handleChatClose} socket={socket} />
        <IonRouterOutlet>
          <Route exact path="/login">
            <Home socket={socket} />
          </Route>
          <Route exact path="/chat">
            <ChatWelcome socket={socket} />
          </Route>
          <Route exact path="/chat/:topic">
            <ChatWindow socket={socket} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
