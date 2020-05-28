import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setApartaments, setQuorum } from '../actions';
import { ASSEMBLY_COLLECTION, PARTICIPANTS_COLLECTION } from "../constants/constants";
import fb from '../firebase';
import { getApartaments, getCof } from '../utils/fb';

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
        quorum: 0
    }

    componentDidMount() {
        fb.collection(ASSEMBLY_COLLECTION).doc(this.props.assembly.id).collection(PARTICIPANTS_COLLECTION).onSnapshot((snapshot) => {
            const participants = snapshot.docs.map(m => parseInt(m.data().apartament));
            getCof(this.props.residential.id, participants.length > 0 ? Array.from(new Set(participants)) : [""]).then((coefficients) => {
                this.setState({ coefficients }, () => {
                    this.sumCoefficients();
                })
            })
        })

        getApartaments(this.props.residential.id).then((apts) => {
            this.props.setApartaments(apts)
        });
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

    render() {
        const { quorum } = this.state;
        return (
            <Stats>
                <h4>{this.props.residential.name}</h4>
                <hr />
                <h5>Información de la asamblea</h5>
                <span><strong>Participantes: </strong>{this.props.participants} de {this.props.residential.total}</span> <br />
                <span><strong>Habilitado votación: </strong>{quorum > 50 ? "Sí" : "No"}</span><br />
                <span><strong>Quorum: </strong>{quorum}%</span>
                <hr />
            </Stats>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
