import fb from '../firebase';
import { BUILDING_COLLECTION, ASSEMBLY_COLLECTION, PARTICIPANTS_COLLECTION, APT_COLLECTION, ACTIVE_SESSIONS } from '../constants/constants'

export const getBuilding = async (id) => {
    if (id) {
        const doc = await fb.collection(BUILDING_COLLECTION).doc(id).get();
        if (doc.exists) {
            return { ...doc.data(), id }
        }
    }
    return null;
}


export const setSession = (apartament, assembly) => {
    fb.collection(ACTIVE_SESSIONS).where("apartment", "==", apartament.id).where("assembly", "==", assembly.id).get()
        .then(res => {
            res.docs.forEach(v => {
                fb.collection(ACTIVE_SESSIONS).doc(v.id).delete();
            })
            fb.collection(ACTIVE_SESSIONS).add({
                apartment: apartament.id,
                assembly: assembly.id,
                last_update: new Date(),
                apartment_ref: fb.doc(APT_COLLECTION + "/" + apartament.id)
            })
        })

}

export const updateSession = (apartment, assembly) => {
    fb.collection(ACTIVE_SESSIONS).where("apartment", "==", apartment.id).where("assembly", "==", assembly.id).get()
        .then(res => {
            res.docs.forEach(v => {
                fb.collection(ACTIVE_SESSIONS).doc(v.id).set({
                    apartment: apartment.id,
                    assembly: assembly.id,
                    last_update: new Date(),
                    apartment_ref: fb.doc(APT_COLLECTION + "/" + apartment.id)
                });
            })
        })
}

export const removeSession = (apartment, assembly) => {
    fb.collection(ACTIVE_SESSIONS).where("apartment", "==", apartment).where("assembly", "==", assembly).get()
        .then(res => {
            res.docs.forEach(v => {
                console.log(v.id);
                fb.collection(ACTIVE_SESSIONS).doc(v.id).delete();
            })
        })
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

export const getCof = async (buildingid, apartaments) => {
    if (apartaments.length <= 10) {
        const data = await fb.collection(APT_COLLECTION).where("building", "==", buildingid).where("number", "in", apartaments).get();
        return data.docs.map((m) => m.data().cof);
    }

    const data = await fb.collection(APT_COLLECTION).where("building", "==", buildingid).get();
    const apts = data.docs.map((m) => {
        return {
            id: m.id,
            ...m.data()
        }
    });
    const joinedApartaments = apts.filter((v) => apartaments.includes(v.number));
    return joinedApartaments.map((m) => m.cof);

}

export const getApartaments = async (buildingid) => {
    const data = await fb.collection(APT_COLLECTION).where("building", "==", buildingid).get();
    return data.docs.map((m) => {
        return {
            id: m.id,
            ...m.data()
        }
    });
}

export const getApartamentsById = async (apartmentId) => {
    const doc = await (await fb.collection(APT_COLLECTION).doc(apartmentId).get()).data();
    return {
        id: apartmentId,
        ...doc
    }
}