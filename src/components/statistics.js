import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setApartaments, setQuorum } from '../actions';
import { ASSEMBLY_COLLECTION, PARTICIPANTS_COLLECTION } from "../constants/constants";
import fb from '../firebase';
import { getApartaments, getCof, getApartamentsById } from '../utils/fb';

const Stats = styled.div({
    marginTop: 20,
    textAlign: "center",
    "h5": {
        fontWeight: 700
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        setQuorum(quorum) {
            dispatch(setQuorum(quorum))
        },
        setApartaments(apartaments) {
            dispatch(setApartaments(apartaments))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

class Statistics extends Component {
    state = {
        coefficients: [],
        participants: 0,
        quorum: 0
    }

    componentDidMount = () => {
        fb.collection(ASSEMBLY_COLLECTION).doc(this.props.assembly.id).collection(PARTICIPANTS_COLLECTION).doc(this.props.apartament.id).set({
            apartament: this.props.apartament.id,
            jitsiid: "temp"
        });
        fb.collection(ASSEMBLY_COLLECTION).doc(this.props.assembly.id).collection(PARTICIPANTS_COLLECTION).onSnapshot(async (snapshot) => {
            const participantsIds = snapshot.docs.map((m) => m.data().apartament);
            const getApartments = async () => Promise.all(participantsIds.map(async (fila) => await getApartamentsById(fila)))
            const apartments = await getApartments();
            this.props.setApartaments(apartments)
            this.setState({ participants: apartments.length, coefficients: apartments.map((fila) => fila.cof) }, () => this.sumCoefficients())
            // getCof(this.props.residential.id, participants.length > 0 ? Array.from(new Set(participants)) : [""]).then((coefficients) => {
            //     this.setState({ coefficients }, () => {
            //         this.sumCoefficients();
            //     })
            // })
        })
        // getApartaments(this.props.residential.id).then((apts) => {
        //     this.props.setApartaments(apts)
        // });
    }

    sumCoefficients() {
        let coefficient = 0;
        if (this.state.coefficients.length > 0) {
            for (const cof of this.state.coefficients) {
                coefficient += parseFloat(cof)
            }
        }
        this.props.setQuorum(coefficient);
        this.setState({ quorum: coefficient })
    }

    round(number) {
        if (number) {
            return Math.round((number + Number.EPSILON) * 100) / 100;
        }
        return 0;
    }

    render() {
        const { quorum, participants } = this.state;
        return (
            <div>
                <h4>{this.props.residential.name}</h4>
                <hr />
                <h5>Información de la asamblea</h5>
                <span><strong>Participantes: </strong>{participants} de {this.props.residential.total}</span> <br />
                <span><strong>Quorum: </strong>{this.round(quorum)}%</span>
                <hr />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
