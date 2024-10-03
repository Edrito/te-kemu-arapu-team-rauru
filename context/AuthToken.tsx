import { auth } from '../firebaseConfig';

export const getIdToken = async (): Promise<string> => {
    const currentUser = auth.currentUser;
    console.log('Trying to get token for currentUser:', currentUser);
    if (currentUser) {
        return await currentUser.getIdToken();
    } else {
        throw new Error('User is not authenticated');
    }
};