
import { getIdToken } from '../context/AuthToken';

const BACKEND_FUNCTION_URL = 'https://on-player-action-5koq7jxpyq-uc.a.run.app/';

export const sendPlayerAction = async (actionPayload: any) => {
    try {
        const token = await getIdToken();
        const response = await fetch(BACKEND_FUNCTION_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionPayload),
        });

        if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from backend:', errorText);
        throw new Error('Failed to send player action');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending player action:', error);
        throw error;
    }
};

