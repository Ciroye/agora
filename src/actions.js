import * as actionTypes from './constants/action-types';

export const setApartament = (apartment) => {
    return {
        type: actionTypes.APARTAMENT_CHANGE,
        apartment
    }
}

export const setBuilding = (building) => {
    return {
        type: actionTypes.RESIDENTIAL_CHANGE,
        building
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

export const setQuestion = (question) => {
    return {
        type: actionTypes.SET_QUESTION,
        question
    }
}