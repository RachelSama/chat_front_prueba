import { IonButton, IonIcon } from '@ionic/react';
import { home } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import classes from './ChatRedirectHome.module.css'

/**
 * Este es un componente de React que muestra un botón con un icono que redirige al usuario a la página
 * de inicio cuando se hace clic.
 * @returns La función `ChatRedirectHome` devuelve un elemento JSX que consta de un componente
 * `IonButton` del marco Ionic. El botón tiene un detector de eventos `onClick` que llama a la función
 * `handleClick`, que utiliza el enlace `useHistory` para volver a la página anterior. El botón también
 * tiene un componente `IonIcon` como elemento secundario, que muestra un icono de inicio.
 */
function ChatRedirectHome() {

    const history = useHistory();

    /**
     * La función handleClick vuelve a la página anterior en el historial del navegador.
     */
    const handleClick = () => {
        history.goBack();
    };

    return (
        <IonButton fill="clear" onClick={() => handleClick()} className={classes.buttonHome} title="Inicio">
            <IonIcon slot="icon-only" icon={home} className={classes.iconHome} title="Inicio"/>
        </IonButton>
    );
}

export default ChatRedirectHome;
