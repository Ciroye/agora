import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container, Row, Col, Alert } from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import { APT_COLLECTION, BUILDING_COLLECTION } from "../constants/constants";
import { getBuilding } from '../utils/fb'
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

function Apartments() {
  const [apartments, setApartments] = useState([]);
  const [Building, setBuilding] = useState([]);
  const [newAdminApartments, setnewAdminApartments] = useState(false);
  const [newCofApartments, setnewCofApartments] = useState(0);
  const [newNumberApartments, setnewNumberApartments] = useState("");
  const [newPasswordApartments, setnewPasswordApartments] = useState("");
  const [newBuildingApartments, setnewBuildingApartments] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(APT_COLLECTION).onSnapshot(async (snapshot) => {
        const apts = [];
        for (const c of snapshot.docs) {
          const apt = {
            id: c.id,
            ...c.data(),
          }
          if(apt.building_reference){
            const building = await apt.building_reference.get()
            apt.buildingname = building.data().name
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
      firebase.collection(BUILDING_COLLECTION).onSnapshot((data) => {
        setBuilding(
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
    if (newBuildingApartments === '') {
      setShowError(true);
    } else {
      firebase.collection(APT_COLLECTION).add({
        admin: newAdminApartments,
        coef: parseFloat(newCofApartments),
        name: newNumberApartments,
        password: newPasswordApartments,
        building: newBuildingApartments,
        building_reference: firebase.doc(BUILDING_COLLECTION+ "/"+ newBuildingApartments)
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
    } else {
      window.alert(
        "No se puede borrar esta apartamento por que ya participo de asambleas"
      );
    }
  }

  function generateP() { 
    var pass = ''; 
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
            'abcdefghijklmnopqrstuvwxyz0123456789'; 
      
    for (var i = 1; i <= 8; i++) { 
        var char = Math.floor(Math.random() 
                    * str.length + 1); 
          
        pass += str.charAt(char) 
    } 
      
    return pass; 
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setnewPasswordApartments(generateP())
    setShow(true)};

  const [showError, setShowError] = useState(false);

  return (
    <Container>
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
                  type="text"
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
                  value={newPasswordApartments}
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
                    setnewBuildingApartments(e.currentTarget.value)
                  }
                >
                  <option value="0"> Seleccione una opción </option>
                  {Building.map((building, i) => (
                    <option key={i} value={building.id}>
                      {building.name}
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
                  <td>{apartment.name}</td>
                  <td>{apartment.coef}</td>
                  <td>{apartment.password}</td>
                  <td>{apartment.buildingname}</td>
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
