import React from 'react';
import Login from '../components/login'
import Footer from '../components/footer'
import { Component } from 'react';
import { Tab, Tabs } from "react-bootstrap";


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
                                             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi quisquam ullam, repellat minima nobis in repellendus veniam quae aut, ex dolorum perspiciatis eligendi deserunt magni qui, cumque ipsa dolor libero!</p>
                                        </Tab>
                                        <Tab eventKey="tab2" title="Unidades residenciales">
                                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est autem assumenda deleniti aliquid adipisci dolore, mollitia sed eum, eius repellendus perferendis laborum! Tenetur sint eum rerum enim perferendis quia voluptates!</p>
                                        </Tab>
                                        <Tab eventKey="tab3" title="Asambleas">
                                             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur possimus inventore mollitia fugit modi consequatur fuga fugiat quisquam tempore, laboriosam maiores eligendi nesciunt tenetur veritatis. Eveniet dolores repudiandae non neque!</p>
                                        </Tab>
                                   </Tabs>
                              </div>
                         </div>
                    </div>}
               </>
          );
     }
}

