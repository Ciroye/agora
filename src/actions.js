import * as actionTypes from './constants/action-types';

export const setApartament = (apartament) => {
    return {
        type: actionTypes.APARTAMENT_CHANGE,
        apartament
    }
}

export const setResidential = (residential) => {
    return {
        type: actionTypes.RESIDENTIAL_CHANGE,
        residential
    }
}

export const setAssembly = (assembly) => {
    return {
        type: actionTypes.ASSEMBLY_CHANGE,
        assembly
    }
}

export const setParticipants = (participants) => {
    return {
        type: actionTypes.PARTICIPANTS_CHANGE,
        participants
    }
}

export const setQuorum = (quorum) => {
    return {
        type: actionTypes.QUORUM_CHANGE,
        quorum
    }
}

export const setApartaments = (apartaments) => {
    return {
        type: actionTypes.APARTAMENTS_CHANGE,
        apartaments
    }
}