import React, { Fragment, useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import { APT_COLLECTION, RESIDENTIAL_COLLECTION } from "../constants/constants";

const Div = styled.div`
  padding-top: 10px;
  margin: 0 auto;
  width: 60%;
`;

const Div2 = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  width: 60%;
`;

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
  const [newNumberApartments, setnewNumberApartments] = useState([]);
  const [newPasswordApartments, setnewPasswordApartments] = useState([]);
  const [newResidentialApartments, setnewResidentialApartments] = useState("");
  

  useEffect(async () => {
    const fetchData = async () => {
      firebase.collection(APT_COLLECTION).onSnapshot(function (data) {
        setApartments(
          data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(RESIDENTIAL_COLLECTION).onSnapshot(function (data) {
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

    firebase.collection(APT_COLLECTION).add({
      admin: newAdminApartments,
      cof: newCofApartments,
      number: newNumberApartments,
      password: newPasswordApartments,
      residential: newResidentialApartments,
    });
  };

  async function onDelete(id) {
    const files = await firebase
      .collection("answers")
      .where("apartment", "==", id)
      .get();

    if (files.docs.length === 0) {
      firebase.collection(APT_COLLECTION).doc(id).delete();
    } else {
      window.alert(
        "No se puede borrar esta apartamento por que ya participo de asambleas"
      );
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            Crear apartamento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
      <Div2>
        <Button variant="primary" onClick={handleShow}>
          Crear apartamento
        </Button>
      </Div2>
      <Div>
        <Table striped bordered hover size="sm" responsive="sm">
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
                <td>{apartment.residential}</td>
                <td>{String(apartment.admin)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(apartment.id)}
                  >
                    {" "}
                    Eliminar{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Div>
    </Fragment>
  );
}

export default Apartments;
