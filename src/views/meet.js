import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { setAssembly, setBuilding } from '../actions';
import Login from '../components/login';
import Questions from '../components/questions';
import { ACTIVE_SESSIONS, ASSEMBLY_COLLECTION } from '../constants/constants';
import fb from '../firebase'
import { getBuilding, setSession, updateSession } from '../utils/fb'


const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBuilding(building) {
      dispatch(setBuilding(building))
    },
    setAssembly(assembly) {
      dispatch(setAssembly(assembly))
    }
  }
}

class Meet extends Component {

  state = {
    logued: false,
    validAssembly: true,
    activeUsers: 0
  }

  diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }


  onLoginComplete = () => {
    this.setState({ logued: true })
    setSession(this.props.apartment, this.props.assembly)
    setInterval(() => {
      updateSession(this.props.apartment, this.props.assembly)
    }, 10000)

    fb.collection(ACTIVE_SESSIONS).where("assembly", "==", this.props.assembly.id).onSnapshot((qs) => {
      this.setActiveSessions(qs);
    })
  }



  setActiveSessions(qs) {
    const sessions = [];
    qs.docs.forEach(d => {
      const session = d.data();
      if (this.diff_minutes(new Date(session.last_update.seconds * 1000), new Date()) < 2) {
        if (!sessions.some(m => m.apartment === session.apartment)) {
          sessions.push(session);
        }
      }
    });
    this.setState({ activeUsers: sessions.length });
  }

  getId() {
    return new URLSearchParams(this.props.location.search).get("id");
  }

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
          window.sessionStorage.setItem("assembly", qs.docs[0].id)
          getBuilding(assembly.building).then(doc => {
            this.props.setBuilding(doc);
          })
        }
      })
      .catch((error) => {
        this.setState({ validAssembly: false });
      });
  }

  componentDidMount() {
    this.validateAssembly();
  }

  render() {
    const { logued, activeUsers } = this.state;
    return (
      <>
        {!logued && <Login onComplete={this.onLoginComplete} />}
        {logued && <>
          <Card className="shadow-sm mb-5 bg-white rounded" style={{ maxWidth: "15%", position: "absolute", top: 0, left: 0, zIndex: 100 }}>
            <Card.Body>
              <h4>Participantes: <strong>{activeUsers}/{this.props.building.quantity}</strong></h4>
              <h4>Quorum: <strong>50%</strong></h4>
            </Card.Body>
          </Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col"> <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat magni explicabo molestias fuga in nihil et, magnam dignissimos praesentium adipisci. Facilis distinctio cupiditate dignissimos minus veniam voluptate quos odit neque.</p> </div>
              <div className="col-4">
                <Questions />
              </div>
            </div>
          </div>
        </>}
      </>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Meet)