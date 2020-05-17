import React, {Fragment, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
 

function Vote(props) {

    const [desition, setDesition] = React.useState("");

    const user_id = '1'

    function onSubmit(e) {
        e.preventDefault();
        var ref = firebase.firestore().collection('agora').doc("asamblea1").collection('questions').doc("HnYHo6pYXBNBV25MubWg");
        var options_si = ref.child("options").child(0);
        var options_no = ref.child("options").child(1);
        if (desition == 'Si') {
            options_si.updte({
                user_id
            })
        } else {
            options_no.updte({
                user_id
            })
        }
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
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2" aria-label="First group">
                        <Button onClick={() => setDesition("Si")}> Si </Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="Third group">
                        <Button onClick={() => setDesition("No")}> No </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit}>Guardar</Button>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
}


export default Vote;