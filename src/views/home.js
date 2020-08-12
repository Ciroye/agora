import styled from "@emotion/styled";
import React, { Component, Fragment } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Apartaments from "../components/apartments";
import Assembly from "../components/assemblies";
import Login from "../components/login";
import { connect } from 'react-redux';
import Residential from "../components/residential";
import fb from '../firebase';

const MarginTop = styled.div`
  margin-top: 5%;
`;

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


class Home extends Component {

  state = {
    logued: false
  };

  onComplete = () => {
    this.setState({ logued: true })
  }

  componentDidMount() {
    const data = [];
    fb.collection('question').get().then((res) => {
      for (const d of res.docs) {
        data.push({
          id: d.id,
          ...d.data()
        })
      }
      console.log(data);
    })
  }

  render() {
    const { logued } = this.state;
    return (
      <Fragment>
        <Login show={!logued} onComplete={this.onComplete} />
        {logued &&
          <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example">
            <Tab eventKey="tab1" title="Apartamentos">
              <MarginTop>
                <Apartaments />
              </MarginTop>
            </Tab>
            <Tab eventKey="tab2" title="Unidades residenciales">
              <MarginTop>
                <Residential />
              </MarginTop>
            </Tab>
            <Tab eventKey="tab3" title="Asambleas">
              <MarginTop>
                <Assembly />
              </MarginTop>
            </Tab>
          </Tabs>
        }
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
