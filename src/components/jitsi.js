import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GUEST_TOOLBAR_BUTTONS, ADMIN_TOOLBAR_BUTTONS } from "../constants/constants";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setResidential(residential) {
      // dispatch(setResidential(residential))
    }
  }
}
class Jitsi extends Component {
  state = {
    jitsi: null,
  };

  componentDidMount() {
    const jitsi = new window.JitsiMeetExternalAPI("camarin.ddns.net", {
      roomName: this.props.assembly.name,
      width: "100%",
      height: "100%",
      parentNode: document.querySelector("#meet-frame"),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: this.props.apartament.admin ? ADMIN_TOOLBAR_BUTTONS : GUEST_TOOLBAR_BUTTONS,
      },
      lockRoomGuestEnabled: true,
      userInfo: {
        displayName: this.props.apartament.number
      }
    });

    this.setState({ jitsi });
  }

  componentWillUnmount() {
    this.state.jitsi.dispose();
  }

  render() {
    return (
      <div id="meet-frame" style={{ height: "100%" }}></div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Jitsi)