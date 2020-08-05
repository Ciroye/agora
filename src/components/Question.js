import styled from '@emotion/styled';
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setApartament } from '../actions';
import { ANSWERS_COLLECTION, QUESTION_COLLECTION } from "../constants/constants";
import fb from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Content = styled.div({
    marginTop: 20,
    marginBottom: 20,
    ".btn-group": {
        width: "100%"
    },
    ".live-results": {
        marginBottom: 20
    },
    ".results": {
        textAlign: "center",
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        setApartament(apartament) {
            dispatch(setApartament(apartament))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

class Question extends Component {
    state = {
        hasVote: false,
        answers: []
    };

    componentDidMount() {
        fb.collection(ANSWERS_COLLECTION).where("apartment", "==", this.props.apartament.id).where("question", "==", this.props.data.id).onSnapshot((qs) => {
            if (qs.docs.length > 0) {
                this.setState({ hasVote: true })
            }
        })

        fb.collection(ANSWERS_COLLECTION).where("question", "==", this.props.data.id).onSnapshot((snap) => {
            const answers = snap.docs.map((m) => {
                return {
                    id: m.id,
                    ...m.data()
                }
            })
            this.setState({ answers })
        })
    }

    getResults() {
        const yes = this.state.answers.filter((m) => m.approve).slice().map(m => m.apartment);
        const no = this.state.answers.filter((m) => !m.approve).slice().map(m => m.apartment);;

        const apartaments = this.props.apartaments;

        const yesApts = apartaments.filter(m => yes.includes(m.id));
        const noApts = apartaments.filter(m => no.includes(m.id));

        let auxY = 0, auxN = 0;
        for (const y of yesApts) {
            auxY += parseFloat(y.cof);
        }
        for (const n of noApts) {
            auxN += parseFloat(n.cof);
        }

        return {
            yes: auxY,
            no: auxN
        }
    }

    delete = async () => {
        if (window.confirm("Seguro que quiere eliminar la pregunta?")) {
            const data = await fb.collection(ANSWERS_COLLECTION).where("question", "==", this.props.data.id).get()
            data.docs.map((m) => {
                fb.collection(ANSWERS_COLLECTION).doc(m.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
                return {
                    id: m.id,
                    ...m.data()
                }
            })
            fb.collection(QUESTION_COLLECTION).doc(this.props.data.id).delete();
        }
    }

    vote(decision) {
        fb.collection(ANSWERS_COLLECTION).add({
            apartment: this.props.apartament.id,
            approve: decision,
            question: this.props.data.id
        })
        this.setState({ hasVote: true })
    }


    round(number) {
        if (number) {
            return Math.round((number + Number.EPSILON) * 100) / 100;
        }
        return 0;
    }

    render() {
        const results = this.getResults();
        return <Content>
            <div className="live-results">
                <h5>Resultados</h5>
                <div className="results">
                    <span className="mr-20"><strong>Sí: </strong> {this.round(results.yes)} %</span>
                    <span><strong>No: </strong>{this.round(results.no)}%</span> <br />
                </div>
            </div>

            <p>{this.props.data.title}</p>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" disabled={this.state.hasVote} onClick={this.vote.bind(this, true)}>Sí</Button>
                <Button variant="secondary" disabled={this.state.hasVote} onClick={this.vote.bind(this, false)}>No</Button>
                {this.props.apartament.admin && <Button variant="danger" onClick={this.delete}><FontAwesomeIcon icon={faTrash} className="pointer" /></Button>}
            </ButtonGroup>
        </Content>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Question)
