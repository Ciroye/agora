import React, {Fragment, useState, useEffect} from 'react'
import styled from '@emotion/styled';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase'
 

function Vote(props) {

    const [vote, setVote] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        firebase.firestore().collection('agora').doc("asamblea1").collection('questions').update({
            
        })
        .then(() => {
            setVote('');
            props.onHide();
        })
    }

    return (
        <Fragment>
            <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Votar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={onSubmit}> Si </Button>
                <Button onClick={onSubmit}> No </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
}


export default Vote;