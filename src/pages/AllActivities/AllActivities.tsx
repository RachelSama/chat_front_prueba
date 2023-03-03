import {
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonButton,
    IonModal,
    IonIcon,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import classes from './AllActivities.module.css'
import ActivitiesContext, { Activity } from "../../data/activities-context";
import CompleteModal from "../../components/CompleteModal";
import { checkmarkOutline } from "ionicons/icons";

const AllActivities: React.FC = () => {

    const [activityToComplete, setActivityToComplete] = useState<Activity>();

    const activitiesCtxt = useContext(ActivitiesContext)

    const openCompleteModal = (activity: Activity) => {
        setActivityToComplete(activity)
    }

    const closeModal = () => {
        setActivityToComplete(undefined)
    }

    return (
        <React.Fragment>
            <IonModal isOpen={!!activityToComplete}>
                <CompleteModal activity={activityToComplete as Activity} dismissModal={closeModal} />
            </IonModal>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>All activities</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        {activitiesCtxt.activities.map(activity => (
                            <IonRow key={activity.id}>
                                <IonCol className="ion-text-center">
                                    <IonCard>
                                        <img src={activity.imageUrl} alt="Activity" />
                                        <IonCardHeader>
                                            <IonCardTitle>{activity.hour}</IonCardTitle>
                                            <IonCardSubtitle>{activity.title}</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p>{activity.description}</p>
                                            <IonItem lines="none">
                                                { !activity.isCompleted ?
                                                    <IonButton
                                                        className={classes.FullWith}
                                                        fill="clear"
                                                        onClick={() => openCompleteModal(activity)}
                                                    >
                                                        Complete Activity
                                                    </IonButton>
                                                    :
                                                    <IonIcon color="success" className={classes.FullWith} icon={checkmarkOutline}/>
                                                }
                                            </IonItem>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        ))
                        }
                    </IonGrid>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default AllActivities;
