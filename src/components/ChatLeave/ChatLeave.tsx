import { IonButton, IonIcon } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import classes from './ChatLeave.module.css'

function ChatLeave() {

    const history = useHistory();

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
