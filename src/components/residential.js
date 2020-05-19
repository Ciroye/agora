import React, {Fragment, useState, useEffect} from 'react'
import {Table, Button, Modal, Form} from 'react-bootstrap'
import firebase from '../firebase'
import styled from '@emotion/styled';
import { PencilSquare } from 'react-bootstrap-icons';

const Div = styled.div `
  padding-top: 10px;
  margin: 0 auto;
  width: 60%;
`;

const Div2 = styled.div `
  padding-top: 20px;
  margin: 0 auto;
  width: 60%;
`;

const Input = styled.input `
    height: calc(1.5em + 1rem + 2px); 
    padding-top: 20px;
    padding: .5rem 1rem; 
    font-size: .9rem; 
    line-height: 1.5; 
    border-radius: 3px;
    width: 100%;
`;


function Residential() {

  const [residentials, setResidentials] = useState([]);
  const [newNameResidentials, setnewNameResidentials] = useState([]);
  const [newTotalResidentials, setnewTotalResidentials] = useState([]);

  const [upDateNameResidentials, setupDateNameResidentials] = useState([]);
  const [upDateTotalResidentials, setupDateTotalResidentials] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      firebase.firestore().collection('residential')
      .onSnapshot(function (data) {
        setResidentials(data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })));
      });
    };
    fetchData();
    }, []);

    const onCreate = () => {
      setShow(false);
      firebase.firestore().collection('residential').add({
        name: newNameResidentials,
        total: newTotalResidentials
      });
    }

    const files = firebase
    .firestore()
    .collection('apartaments')
    .where('residential', '==', 'QLw3Hz7D8BOJtDlNEJ7i').
    get();

    console.log(files);

    async function onDelete (id) {
      const categoryDocRef = firebase.firestore()
      .collection('residential')
      .doc(id);

      const files = await firebase
      .firestore()
      .collection('apartaments')
      .where('residential', '==', categoryDocRef).
      get();

      console.log(files);
      firebase.firestore().collection('residential').doc(id).delete();
    }

    const onUpdate = (id) => {
      firebase.firestore().collection('residential').doc(id).set({
        name: upDateNameResidentials,
        total: upDateTotalResidentials
      });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    
  return (
      <Fragment>
          <Modal
            show={show} 
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Crear unidad
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre unidad</Form.Label>
              <Input
                  type="string"
                  className="form-control"
                  placeholder="Nombre unidad"
                  onChange = {e => setnewNameResidentials(e.currentTarget.value)}
                  required
              ></Input>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Apartamentos</Form.Label>
              <Input
                  type="number"
                  className="form-control"
                  placeholder="Numero de apartamentos"
                  onChange = {e => setnewTotalResidentials(e.currentTarget.value)}
                  required
              ></Input>
            </Form.Group>
          </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCreate}> Crear unidad</Button>
                <Button onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
          <Div2>
            <Button variant="primary" onClick={handleShow}>
              Crear unidad
            </Button>
          </Div2>
          <Div>
            <Table striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Numero de apts </th>
                        <th> Eliminar edificio </th>
                    </tr>
                </thead>
                <tbody>
                  {residentials.map(residential =>
                    <tr>
                      <td>{residential.name}</td>
                      <td>{residential.total}</td>
                      <td>
                        <Button variant="danger" onClick={() => onDelete(residential.id)}> Eliminar </Button>
                        <span> </span>
                      </td>
                    </tr>
                  )}
                </tbody>
            </Table>
          </Div>
      </Fragment>
  );
}


export default Residential;