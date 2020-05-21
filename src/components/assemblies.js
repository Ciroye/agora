import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import firebase from "../firebase";
import styled from "@emotion/styled";
import {
  ASSEMBLY_COLLECTION,
  RESIDENTIAL_COLLECTION,
} from "../constants/constants";
import { getResidential } from "../utils/fb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Input = styled.input`
  height: calc(1.5em + 1rem + 2px);
  padding-top: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 3px;
  width: 100%;
`;

function Assembly() {
  const [assemblies, setAssemblies] = useState([]);
  const [residentials, setResidentials] = useState([]);
  const [newDateAssemblies, setnewDateAssemblies] = useState(false);
  const [newNameAssemblies, setnewNameAssemblies] = useState(false);
  const [newUrlAssemblies, setnewUrlAssemblies] = useState(false);
  const [newResidentialAssemblies, setnewResidentialAssemblies] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      firebase.collection(ASSEMBLY_COLLECTION).onSnapshot(async (snapshot) => {
        const assems = [];
        for (const c of snapshot.docs) {
          const assem = {
            id: c.id,
            ...c.data(),
          };
          const resi = await getResidential(assem.residential);
          if (resi) {
            assem.residentialname = resi.name;
          }
          assems.push(assem);
        }
        setAssemblies(assems);
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
    setShow(false);

    firebase.collection(ASSEMBLY_COLLECTION).add({
      date: newDateAssemblies,
      name: newNameAssemblies,
      residential: newResidentialAssemblies,
      url: newUrlAssemblies,
    });
  };

  async function onDelete(id) {
    const files = await firebase
      .collection("question")
      .where("assambly", "==", id)
      .get();

    if (files.docs.length === 0) {
      firebase.collection(ASSEMBLY_COLLECTION).doc(id).delete();
    } else {
      window.alert(
        "No se puede borrar esta asamblea por que ya tiene una asamblea asociadas"
      );
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
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
              Crear asamblea
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre asamblea</Form.Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de la asamblea"
                  defaultChecked={false}
                  onChange={(e) => setnewNameAssemblies(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Fecha</Form.Label>
                <Input
                  type="date"
                  className="form-control"
                  placeholder="Fecha"
                  onChange={(e) => setnewDateAssemblies(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Url</Form.Label>
                <Input
                  type="text"
                  className="form-control"
                  onChange={(e) => setnewUrlAssemblies(e.currentTarget.value)}
                  required
                ></Input>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Unidad residencial</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setnewResidentialAssemblies(e.currentTarget.value)
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCreate}> Crear asamblea</Button>
            <Button onClick={handleClose}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }} xs={12} sm={12}>
          <Button
            variant="primary"
            style={{ marginBottom: 10 }}
            className="float-right"
            onClick={handleShow}
          >
            Crear asamblea
          </Button>
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive="sm"
            className="text-center"
          >
            <thead>
              <tr>
                <th> Nombre </th>
                <th> Fecha </th>
                <th> Unidad </th>
                <th> Url </th>
                <th> Eliminar </th>
              </tr>
            </thead>
            <tbody>
              {assemblies.map((assembly, i) => (
                <tr key={i}>
                  <td>{assembly.name}</td>
                  <td>{assembly.date}</td>
                  <td>{assembly.residentialname}</td>
                  <td>
                    <a target="blank" href={`${window.location.href}meet?id=${assembly.url}`}>
                      {assembly.url}
                    </a>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger pointer"
                      onClick={() => onDelete(assembly.id)}
                    />
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

export default Assembly;
