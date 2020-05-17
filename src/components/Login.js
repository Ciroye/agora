import Form from 'react-bootstrap/Form';
import React, {Fragment, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase'
  

function Login(props) {
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
                        <Form.Label >Apartamento</Form.Label>
                        <Form.Control type="email" placeholder="Entre el apt" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label >Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Clave" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button > Entrar </Button>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
        </Fragment>
    );
}


export default Login;
