import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GUEST_TOOLBAR_BUTTONS, ADMIN_TOOLBAR_BUTTONS } from "../constants";

export default class Meet extends Component {
  state = {
    jitsi: null,
  };

  componentDidMount() {
    const jitsi = new window.JitsiMeetExternalAPI("camarin.ddns.net", {
      roomName: "JitsiMeetAPIExample",
      width: "100%",
      height: "100%",
      parentNode: document.querySelector("#meet-frame"),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: GUEST_TOOLBAR_BUTTONS,
      },
    });

    this.setState({ jitsi });
  }

  componentWillUnmount() {
    this.state.jitsi.dispose();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="10"
            id="meet-frame"
            style={{ paddingLeft: 0, height: "100vh" }}
          ></Col>
          <Col l>Juanma, esto es muy easy</Col>
        </Row>
      </Container>
    );
  }
}
