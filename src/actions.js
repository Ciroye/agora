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