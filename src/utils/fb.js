import fb from '../firebase';
import { RESIDENTIAL_COLLECTION, ASSEMBLY_COLLECTION, PARTICIPANTS_COLLECTION, APT_COLLECTION } from '../constants/constants'

export const getResidential = async (id) => {
    if (id) {
        const doc = await fb.collection(RESIDENTIAL_COLLECTION).doc(id).get();
        if (doc.exists) {
            return { ...doc.data(), id }
        }
    }
    return null;
}

export const deleteParticipant = (assemblyid, id) => {
    fb.collection(ASSEMBLY_COLLECTION).doc(assemblyid).collection(PARTICIPANTS_COLLECTION).doc(id).delete();
}

export const deleteApartament = (assemblyid, apartament) => {
    fb.collection(ASSEMBLY_COLLECTION).doc(assemblyid).collection(PARTICIPANTS_COLLECTION).where("apartament", "==", apartament)
        .get().then((qs) => {
            qs.docs.forEach((v) => {
                deleteParticipant(assemblyid, v.id);
            })
        });
}

export const getCof = async (residentialid, apartaments) => {
    if (apartaments.length <= 10) {
        const data = await fb.collection(APT_COLLECTION).where("residential", "==", residentialid).where("number", "in", apartaments).get();
        return data.docs.map((m) => m.data().cof);
    }

    const data = await fb.collection(APT_COLLECTION).where("residential", "==", residentialid).get();
    const apts = data.docs.map((m) => {
        return {
            id: m.id,
            ...m.data()
        }
    });
    const joinedApartaments = apts.filter((v) => apartaments.includes(v.number));
    return joinedApartaments.map((m) => m.cof);

}

export const getApartaments = async (residentialid) => {

    const data = await fb.collection(APT_COLLECTION).where("residential", "==", residentialid).get();
    return data.docs.map((m) => {
        return {
            id: m.id,
            ...m.data()
        }
    });

}