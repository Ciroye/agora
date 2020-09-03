import React, { Component, Fragment } from "react";
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAssembly, setResidential } from '../actions';
import CreateQuestion from '../components/create-question';
// import Jitsi from '../components/jitsi';
import Login from '../components/Login';
import Question from '../components/Question';
import Statistics from '../components/statistics';
import { ASSEMBLY_COLLECTION, QUESTION_COLLECTION, ANSWERS_COLLECTION } from "../constants/constants";
import fb from "../firebase";
import { getResidential } from '../utils/fb';
import ReactExport from "react-export-excel";
import { Button } from 'react-bootstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
    logued: false,
    questions: []
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
          this.props.setAssembly({ ...assembly, id: qs.docs[0].id });
          getResidential(assembly.residential).then(doc => {
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
    fb.collection(QUESTION_COLLECTION).where("assembly", "==", this.props.assembly.id).onSnapshot((snap) => {
      const questions = snap.docs.map((m) => {
        return {
          id: m.id,
          ...m.data()
        }
      });
      this.setState({ questions })
    })
  }

  componentDidMount() {
    this.validateAssembly();
  }

  render() {
    const { validAssembly, logued, questions } = this.state;
    return <Fragment>
      <Modal centered show={!validAssembly} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Error al unirse a la sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>La sesión a la que está intentando acceder ya no está activa o no existe.</Modal.Body>
      </Modal>
      <Login show={validAssembly && !logued} onComplete={this.onComplete} />
      {
        (validAssembly && logued) &&
        <Container fluid>
          <Row>
            <Col lg="4" style={{ height: "100vh", paddingLeft: 0 }}>
              {/* <Jitsi></Jitsi> */}
            </Col>
            <Col lg="4" style={{ maxHeight: "100vh" }}>
              <Statistics />
              {this.props.apartament.admin && <CreateQuestion />}
              <hr />
              {questions.map((v, i) => <Question data={v} key={i} />)}
            </Col>
          </Row>
        </Container>
      }
    </Fragment>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meet)