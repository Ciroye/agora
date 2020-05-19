import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Apartaments from '../components/apartments'
import Residential from '../components/residential'
import styled from '@emotion/styled'


const MarginTop = styled.div`
  margin-top: 5%;
`

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
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ullam ab vitae nesciunt iste ea minima modi, culpa quis incidunt, nisi earum quisquam consectetur autem maiores. Voluptates aliquam sed numquam!</h1>
      </Tab>
    </Tabs>
  )
}

export default Home;
