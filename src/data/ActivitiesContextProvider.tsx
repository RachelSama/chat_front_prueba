import React, { useState } from "react";
import ActivitiesContext, { ActivitiesContextModel, Activity, ActivityType } from "./activities-context";

interface ActivitiesContextProviderProps {
    children: React.ReactNode;
}

const ActivitiesContextProvider: React.FC<ActivitiesContextProviderProps> = (props) => {

    const [activities, setActivities] = useState<Activity[]>(
        [
            {
                id: Math.random().toString(),
                title: 'My daily sleep',
                description: 'Sleep through the night',
                hour: '23:00',
                activityType: 'rest',
                imageUrl: '/assets/images/rest.png',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Hard work',
                description: 'Work in the projects I have',
                hour: '9:00',
                activityType: 'work',
                imageUrl: '/assets/images/work.png',
                isCompleted: false
            },
            {
                id: Math.random().toString(),
                title: 'Read a book',
                description: 'Read one of all of my books',
                hour: '19:00',
                activityType: 'hobby',
                imageUrl: '/assets/images/hobby.png',
                isCompleted: false
            }
        ]
    );

    const addActivity = (title: string, description: string, hour: string, activityType: ActivityType) => {
        let imageUrl = '';
        switch (activityType) {
            case 'rest':
                imageUrl = '/assets/images/rest.png'
                break;
            case 'work':
                imageUrl = '/assets/images/work.png'
                break;
            case 'hobby':
                imageUrl = '/assets/images/hobby.png'
                break;
            default:
                imageUrl = '/assets/images/rest.png'
                break;
        };

        const newActivity: Activity = {
            id: Math.random().toString(),
            title,
            description,
            hour,
            activityType,
            imageUrl,
            isCompleted: false
        };

        setActivities(currActivities => {
            return [...currActivities, newActivity]
        });
    }

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updatedActivities = [...currActivities]
            const selectedActivityIndex = activities.findIndex(act => act.id === activityId)
            const updatedActivity = { ...updatedActivities[selectedActivityIndex], isCompleted: true }
            updatedActivities[selectedActivityIndex] = updatedActivity
            return updatedActivities
        })
    }

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    };

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    );
};

export default ActivitiesContextProvider;