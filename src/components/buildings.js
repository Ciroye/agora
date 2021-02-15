import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container, Row, Col} from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import { BUILDING_COLLECTION } from "../constants/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



const Input = styled.input`
  height: calc(1.5em + 1rem + 2px);
  padding-top: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 3px;
  width: 100%;
`;

function Buildings() {
  const [residentials, setResidentials] = useState([]);
  const [newNameResidentials, setnewNameResidentials] = useState([]);
  const [newTotalResidentials, setnewTotalResidentials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(BUILDING_COLLECTION).onSnapshot(function (data) {
        setResidentials(
          data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    fetchData();
  }, []);

  const onCreate = () => {
    setShow(false);
    firebase.collection(BUILDING_COLLECTION).add({
      name: newNameResidentials,
      total: newTotalResidentials,
    });
  };

  async function onDelete(id) {
    const files = await firebase
      .collection("apartaments")
      .where("residential", "==", id)
      .get();

    if (files.docs.length === 0) {
      firebase.collection(BUILDING_COLLECTION).doc(id).delete();
    } else {
      window.alert(
        "No se puede borrar por que existen apartamentos asociados a esta unidad"
      );
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
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
                onChange={(e) => setnewNameResidentials(e.currentTarget.value)}
                required
              ></Input>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Apartamentos</Form.Label>
              <Input
                type="number"
                className="form-control"
                placeholder="Numero de apartamentos"
                onChange={(e) => setnewTotalResidentials(e.currentTarget.value)}
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
      <Row>
        <Col md={{ span: 10, offset: 1 }} xs={12} sm={12}>
          <Button
            variant="primary"
            style={{ marginBottom: 10 }}
            className="float-right"
            onClick={handleShow}
          >
            Crear unidad
          </Button>
          <Table striped bordered hover size="sm" responsive="sm" className="text-center">
            <thead>
              <tr>
                <th> Unidad </th>
                <th> Cantidad de apartamentos </th>
                <th> Eliminar Unidad </th>
              </tr>
            </thead>
            <tbody>
              {residentials.map((residential, i) => (
                <tr key={i}>
                  <td>{residential.name}</td>
                  <td>{residential.total}</td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} className="text-danger pointer" onClick={() => onDelete(residential.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Buildings;
