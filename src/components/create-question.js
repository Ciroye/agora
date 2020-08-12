import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setApartament } from '../actions';
import { Button, Modal, Form } from 'react-bootstrap'
import styled from '@emotion/styled';
import fb from '../firebase';
import { QUESTION_COLLECTION } from '../constants/constants'


const Content = styled.div({
    marginTop: 20,
    marginBottom: 20,
    ".btn": {
        width: "100%"
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

class CreateQuestion extends Component {
    state = {
        open: false,
        question: ""
    };

    onSubmit = () => {
        fb.collection(QUESTION_COLLECTION).add({
            assembly: this.props.assembly.id,
            title: this.state.question,
            date: new Date()
        }).then((ev) => {
            this.setState({ open: false, question: "" })
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <Content>
                <Modal show={this.state.open} size="md" centered onHide={this.handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Crear pregunta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Pregunta</Form.Label>
                        <Form.Control
                            name="question"
                            type="text"
                            autoComplete="off"
                            value={this.state.question}
                            onChange={this.handleInputChange}
                            placeholder="ingrese la pregunta."
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onSubmit}> Crear pregunta</Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" onClick={(ev) => { this.setState({ open: true }) }}>Crear pregunta</Button>
                <hr />
            </Content>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)
