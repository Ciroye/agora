import { GUEST_TOOLBAR_BUTTONS, ADMIN_TOOLBAR_BUTTONS } from "../constants/constants";
import { ASSEMBLY_COLLECTION, PARTICIPANTS_COLLECTION } from "../constants/constants";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setParticipants } from '../actions'
import fb from '../firebase';
import { deleteParticipant, deleteApartament } from '../utils/fb'


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParticipants(participants) {
      dispatch(setParticipants(participants))
    }
  }
}
class Jitsi extends Component {
  state = {
    jitsi: null,
  };

  updateParticipants() {
    this.props.setParticipants(this.state.jitsi.getNumberOfParticipants())
  }

  onParticipantJoined = ({ id, displayName }) => {
    if (displayName != this.props.apartament.number) {
      if (!isNaN(parseInt(displayName))) {
        const assembly = this.props.assembly;
        fb.collection(ASSEMBLY_COLLECTION).doc(assembly.id).collection(PARTICIPANTS_COLLECTION).add(
          { apartament: displayName, jitsiid: id }
        );
      }
    }
    this.updateParticipants();
  }

  onParticipantLeft = ({ id }) => {
    const assembly = this.props.assembly;
    const participants = fb.collection(ASSEMBLY_COLLECTION).doc(assembly.id).collection(PARTICIPANTS_COLLECTION)
    participants.where("jitsiid", "==", id).get().then((qs) => {
      let participant = null;
      qs.docs.forEach(m => {
        participant = m.data();
        deleteApartament(assembly.id, participant.apartament);
        deleteParticipant(assembly.id, m.id);
      });
    })
    this.updateParticipants();
  }

  onJitsiInit = (event) => {
    console.log(event);
  }

  updateAssembly(apartamentNumber) {
    const assembly = this.props.assembly;
    fb.collection(ASSEMBLY_COLLECTION).doc(assembly.id).update({
      ...assembly,
      participants: [...assembly.participants]
    });
  }

  componentDidMount() {

    const jitsi = new window.JitsiMeetExternalAPI("camarin.ddns.net", {
      roomName: this.props.assembly.name,
      width: "100%",
      height: "100%",
      parentNode: document.querySelector("#meet-frame"),
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: this.props.apartament.admin ? ADMIN_TOOLBAR_BUTTONS : GUEST_TOOLBAR_BUTTONS,
        remoteVideoMenu: {
          // If set to true the 'Kick out' button will be disabled.
          disableKick: false
        }
      },
      lockRoomGuestEnabled: true,
      userInfo: {
        displayName: this.props.apartament.number
      },
      configOverwrite: { startWithAudioMuted: !this.props.apartament.admin, startAudioOnly: !this.props.apartament.admin },
      onload: this.onJitsiInit
    });

    jitsi.on("participantJoined", this.onParticipantJoined)
    jitsi.on("participantLeft", this.onParticipantLeft)

    setTimeout(() => {
      this.props.setParticipants(this.state.jitsi.getNumberOfParticipants())
    }, 10000);

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