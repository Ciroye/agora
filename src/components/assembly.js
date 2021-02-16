import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container, Row, Col, Alert } from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import { ASSEMBLY_COLLECTION, BUILDING_COLLECTION } from "../constants/constants";
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

function Assemblys() {
  const [assemblys, setAssemblys] = useState([]);
  const [Building, setBuilding] = useState([]);
  const [newDateAssemblys, setnewDateAssemblys] = useState([]);
  const [newNameAssemblys, setnewNameAssemblys] = useState([]);
  const [newUrlAssemblys, setnewUrlAssemblys] = useState([]);
  const [newBuildingAssemblys, setnewBuildingAssemblys] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(ASSEMBLY_COLLECTION).onSnapshot(async (snapshot) => {
        const apts = [];
        for (const c of snapshot.docs) {
          const apt = {
            id: c.id,
            ...c.data(),
          }
          const resi = await getBuilding(apt.building);
          if (resi) {
            apt.buildingname = resi.name;
          }
          apts.push(apt);
        }
        setAssemblys(apts);
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
    if (newBuildingAssemblys === '') {
      setShowError(true);
    } else {
      firebase.collection(ASSEMBLY_COLLECTION).add({
        date: newDateAssemblys,
        name: newNameAssemblys,
        url: newUrlAssemblys,
        building: newBuildingAssemblys,
      });
      setShow(false);
      setShowError(false);
    }
  };

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

  async function onDelete(id) {
    const files = await firebase
      .collection("answers")
      .where("assembly", "==", id)
      .get();

    if (files.docs.length === 0) {
      firebase.collection(ASSEMBLY_COLLECTION).doc(id).delete();
    } else {
      window.alert(
        "No se puede borrar esta apartamento por que ya participo de asambleas"
      );
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setnewUrlAssemblys(generateP())
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
              Crear Asamblea
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant={"danger"} show={showError}>
              Debes seleccionar una unidad
            </Alert>
            <Form>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Unidad residencial</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setnewBuildingAssemblys(e.currentTarget.value)
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

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Asamblea</Form.Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de la reunión"
                  onChange={(e) => setnewNameAssemblys(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Fecha</Form.Label>
                <Input
                  type="date"
                  className="form-control"
                  placeholder="Fecha de la reunión"
                  onChange={(e) => setnewDateAssemblys(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Url</Form.Label>
                <Input
                  type="text"
                  value={newUrlAssemblys}
                  className="form-control"
                  placeholder="Link de conexión a la reunión"
                  onChange={(e) =>
                    setnewUrlAssemblys(e.currentTarget.value)
                  }
                  required
                ></Input>
              </Form.Group>


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCreate}> Crear asamblea </Button>
            <Button onClick={handleClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }} xs={12} sm={12}>
          <Button variant="primary" style={{ marginBottom: 10 }} className="float-right" onClick={handleShow}>
          Crear asamblea
          </Button>
          <Table striped bordered hover size="sm" responsive="sm" className="text-center">
            <thead>
              <tr>
                <th> Asamblea </th>
                <th> Fecha </th>
                <th> Link de conexión </th>
                <th> Unidad </th>
                <th> Eliminar </th>
              </tr>
            </thead>
            <tbody>
              {assemblys.map((assembly, i) => (
                <tr key={i}>
                  <td>{assembly.name}</td>
                  <td>{assembly.date}</td>
                  <td>{assembly.url}</td>
                  <td>{assembly.building}</td>

                  <td>
                    <FontAwesomeIcon icon={faTrash} className="text-danger pointer" onClick={() => onDelete(assembly.id)} />
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

export default Assemblys;
