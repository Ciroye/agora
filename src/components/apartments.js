import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container, Row, Col, Alert } from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import { APT_COLLECTION, RESIDENTIAL_COLLECTION } from "../constants/constants";
import { getResidential } from '../utils/fb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useToasts } from 'react-toast-notifications'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = styled.input`
  height: calc(1.5em + 1rem + 2px);
  padding-top: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 3px;
  width: 100%;
`;

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [residentials, setResidentials] = useState([]);
  const [newAdminApartments, setnewAdminApartments] = useState(false);
  const [newCofApartments, setnewCofApartments] = useState([]);
  const [newNumberApartments, setnewNumberApartments] = useState("");
  const [newPasswordApartments, setnewPasswordApartments] = useState([]);
  const [newResidentialApartments, setnewResidentialApartments] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(APT_COLLECTION).onSnapshot(async (snapshot) => {
        const apts = [];
        for (const c of snapshot.docs) {
          const apt = {
            id: c.id,
            ...c.data(),
          }
          const resi = await getResidential(apt.residential);
          if (resi) {
            apt.residentialname = resi.name;
          }
          apts.push(apt);
        }
        setApartments(apts);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(RESIDENTIAL_COLLECTION).onSnapshot((data) => {
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
    if (newResidentialApartments == '') {
      setShowError(true);
    } else {
      firebase.collection(APT_COLLECTION).add({
        admin: newAdminApartments,
        cof: parseFloat(newCofApartments),
        number: parseInt(newNumberApartments),
        password: newPasswordApartments,
        residential: newResidentialApartments,
      });
      setShow(false);
      setShowError(false);
    }
  };

  async function onDelete(id) {
    const files = await firebase
      .collection("answers")
      .where("apartment", "==", id)
      .get();

    if (files.docs.length === 0) {
      firebase.collection(APT_COLLECTION).doc(id).delete();
      notify();
    } else {
      window.alert(
        "No se puede borrar esta apartamento por que ya participo de asambleas"
      );
    }
  }

  const notify = () => toast.info('Se elimino el registro', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showError, setShowError] = useState(false);

  return (
    <Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Row>
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Crear apartamento
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant={"danger"} show={showError}>
              Debes seleccionar una unidad
            </Alert>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Apt</Form.Label>
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Numero del apartamento"
                  defaultChecked={false}
                  onChange={(e) => setnewNumberApartments(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Coeficiente</Form.Label>
                <Input
                  type="number"
                  className="form-control"
                  placeholder="Coeficiente apt"
                  onChange={(e) => setnewCofApartments(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setnewPasswordApartments(e.currentTarget.value)
                  }
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Unidad residencial</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setnewResidentialApartments(e.currentTarget.value)
                  }
                >
                  <option value="0"> Seleccione una opción </option>
                  {residentials.map((residential, i) => (
                    <option key={i} value={residential.id}>
                      {residential.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Admin</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Si"
                  value="true"
                  onChange={(e) => setnewAdminApartments(e.currentTarget.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCreate}> Crear apartamento</Button>
            <Button onClick={handleClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }} xs={12} sm={12}>
          <Button variant="primary" style={{ marginBottom: 10 }} className="float-right" onClick={handleShow}>
            Crear apartamento
          </Button>
          <Table striped bordered hover size="sm" responsive="sm" className="text-center">
            <thead>
              <tr>
                <th> Apt </th>
                <th> Coeficiente </th>
                <th> Contraseña </th>
                <th> Unidad </th>
                <th> Admin </th>
                <th> Eliminar </th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment, i) => (
                <tr key={i}>
                  <td>{apartment.number}</td>
                  <td>{apartment.cof}</td>
                  <td>{apartment.password}</td>
                  <td>{apartment.residentialname}</td>
                  <td>{apartment.admin ? "Sí" : "No"}</td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} className="text-danger pointer" onClick={() => onDelete(apartment.id)} />
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

export default Apartments;
