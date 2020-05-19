import React from 'react'
import { Tabs } from "@yazanaabed/react-tabs";
import Residential from '../components/residential'
import Apartaments from '../components/apartments'
import styled from '@emotion/styled';


const Div = styled.div `
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: "center";
`;

const Home = () => {
  return(
    <Div>
    <Tabs
      activeTab={{
        id: "tab1"
      }}
    >
      <Tabs.Tab id="tab1" title="Unidades residenciales">
        <Div > <Residential></Residential> </Div>
      </Tabs.Tab>
      <Tabs.Tab id="tab2" title="Apartamentos">
        <Div >  <Apartaments></Apartaments> </Div>
      </Tabs.Tab>
      <Tabs.Tab id="tab3" title="Asambleas">
        <Div >  </Div>
      </Tabs.Tab>
    </Tabs>
  </Div>
  )
}

export default Home;
