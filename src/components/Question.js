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
        hasVote: false
    };

    componentDidMount() {
        fb.collection(ANSWERS_COLLECTION).where("apartment", "==", this.props.apartament.id).where("question", "==", this.props.data.id).get().then((qs) => {
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
            console.log(answers);
        })
    }

    delete = () => {
        if (window.confirm("Seguro que quiere eliminar la pregunta?")) {
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

    render() {
        return <Content>
            <div className="live-results">
                <h5>Resultados</h5>
                <div className="results">
                    <span className="mr-20"><strong>Sí: </strong> {25} %</span>
                    <span><strong>No: </strong>{40}%</span> <br />
                </div>
            </div>

            <p>{this.props.data.title}</p>
            <ButtonGroup aria-label="Basic example">
                <Button variant="primary" disabled={this.state.hasVote} onClick={this.vote.bind(this, true)}>Sí</Button>
                <Button variant="secondary" disabled={this.state.hasVote} onClick={this.vote.bind(this, false)}>No</Button>
                <Button variant="danger"><FontAwesomeIcon icon={faTrash} className="pointer" onClick={this.delete} /></Button>
            </ButtonGroup>
        </Content>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Question)
