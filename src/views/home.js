import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Apartaments from "../components/apartments";
import Residential from "../components/residential";
import Assembly from "../components/assemblies";
import styled from "@emotion/styled";

const MarginTop = styled.div`
  margin-top: 5%;
`;

const Home = () => {
  return (
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
  );
};

export default Home;
