import { IonButton, IonIcon } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import classes from './ChatLeave.module.css'

/**
 * Este es un componente de TypeScript React que maneja salir de una sala de chat al eliminar la
 * información del usuario del almacenamiento local y redirigir a la página de inicio de sesión.
 * @returns Un componente de React llamado ChatLeave, que representa un IonButton con un IonIcon
 * dentro. Cuando se hace clic en el botón, se eliminan algunos elementos del almacenamiento local, se
 * redirige al usuario a la página "/iniciar sesión" con el enlace useHistory y se vuelve a cargar la
 * página.
 */
function ChatLeave() {

    const history = useHistory();

    /**
     * La función elimina los datos del usuario del almacenamiento local, los redirige a la página de
     * inicio de sesión y vuelve a cargar la ventana.
     */
    const handleClick = () => {

        localStorage.removeItem("userName")
        localStorage.removeItem("roomName")
        localStorage.removeItem("uuid")
        history.push("/login")
        window.location.reload()
    };

    return (
        <IonButton fill="clear" onClick={() => handleClick()} className={classes.buttonHome} title="Inicio">
            <IonIcon slot="icon-only" icon={exitOutline} className={classes.iconHome} title="Inicio"/>
        </IonButton>
    );
}

export default ChatLeave;
