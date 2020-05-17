import Form from 'react-bootstrap/Form';
import React, {Fragment, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase'
import styled from '@emotion/styled';

const Input = styled.input `
    height: calc(1.5em + 1rem + 2px); 
    padding: .5rem 1rem; 
    font-size: .9rem; 
    line-height: 1.5; 
    border-radius: 3px;
    width: 100%;
`;
  

function Login(props) {
    const [apt, setApt] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        firebase.firestore().collection('agora').doc("asamblea1").collection('users').add({
            apt,
            password
        })
        .then(() => {
            setApt('');
            setPassword('');
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
                    Registrar usuarios
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label onChange = {e => setApt(e.currentTarget.value)} >Apartamento</Form.Label>
                        <Form.Control placeholder="Entre el apt" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label onChange = {e => setPassword(e.currentTarget.value)}>Contraseña</Form.Label>
                        <Form.Control placeholder="Clave" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit}> Guardar apt</Button>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
}


export default Login;
