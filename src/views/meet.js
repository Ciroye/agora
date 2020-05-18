import React, { Component, Fragment } from "react";
import { ASSEMBLY_COLLECTION } from "../constants/constants";
import fb from "../firebase";
import { Modal, Container, Row, Col } from 'react-bootstrap';
import Login from '../components/login'
import { connect } from 'react-redux';
import { setResidential, setAssembly } from '../actions'
import { getResidential } from '../utils/fb'
import Jitsi from '../components/jitsi'


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setResidential(residential) {
      dispatch(setResidential(residential))
    },
    setAssembly(assembly) {
      dispatch(setAssembly(assembly))
    }
  }
}

class Meet extends Component {
  state = {
    validAssembly: true,
    logued: false
  };

  validateAssembly() {
    fb.collection(ASSEMBLY_COLLECTION)
      .where("url", "==", this.getId())
      .get()
      .then((qs) => {
        if (qs.docs.length === 0) {
          this.setState({ validAssembly: false })
        } else {
          const assembly = qs.docs[0].data();
          this.props.setAssembly(assembly);
          getResidential(assembly.residential.id).then(doc => {
            this.props.setResidential(doc);
          })
        }
      })
      .catch((error) => {
        this.setState({ validAssembly: false });
      });
  }

  getId() {
    return new URLSearchParams(this.props.location.search).get("id");
  }

  onComplete = () => {
    this.setState({ logued: true })
  }

  componentDidMount() {
    this.validateAssembly();
  }

  render() {
    const { validAssembly, logued } = this.state;
    return <Fragment>
      <Modal centered show={!validAssembly} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Erro al unirse a la sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>La sesión a la que está intentando acceder ya no está activa o no existe.</Modal.Body>
      </Modal>
      <Login show={validAssembly && !logued} onComplete={this.onComplete} />
      {
        (validAssembly && logued) &&
        <Container fluid>
          <Row>
            <Col lg="10" style={{ height: "100vh", paddingLeft: 0 }}>
              <Jitsi></Jitsi>
            </Col>
            <Col>
              hello world
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meet)