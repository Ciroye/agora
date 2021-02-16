import React from 'react';
import Login from '../components/login'
import { Component } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import Buildings from '../components/buildings';
import Apartments from '../components/apartments';
import Assembly from '../components/assembly';


export default class Homo extends Component {

     state = {
          logued: false,
     }

     onLoginComplete = () => {
          this.setState({ logued: true })
     }

     render() {
          const { logued } = this.state;
          return (
               <>
                    {!logued && <Login onComplete={this.onLoginComplete} />}
                    {logued && <div className="container">
                         <div className="row">
                              <div className="col">
                                   <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example">
                                        <Tab eventKey="tab1" title="Apartamentos">
                                            
                                             <Apartments/>
                                        </Tab>
                                        <Tab eventKey="tab2" title="Unidades residenciales">
                                            
                                             <Buildings/>
                                       
                                        </Tab>
                                        <Tab eventKey="tab3" title="Asambleas">
                                             
                                             <Assembly/>     
                                                  
                                        </Tab>
                                   </Tabs>
                              </div>
                         </div>
                    </div>}
               </>
          );
     }
}

