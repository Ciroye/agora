import fb from '../firebase';
import { RESIDENTIAL_COLLECTION } from '../constants/constants'

export const getResidential = async (id) => {
    const doc = await fb.collection(RESIDENTIAL_COLLECTION).doc(id).get();
    if (doc.exists) {
        return { ...doc.data(), id }
    }
    return null;
}