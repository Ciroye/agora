import React, { Component } from 'react';
import { Navbar, Button, Card } from "react-bootstrap";

export default class Questions extends Component {
    render() {
        return <div style={{ maxHeight: "100vh", height: "100vh", overflow: "hidden", overflowY: "scroll", padding: "10px" }} className="shadow-sm rounded">
            <Card className="shadow-sm mb-2 rounded">
                <Card.Body >
                    <div className="text-center">
                        <Button style={{ width: "100%" }} variant="primary" size="sm">Crear preguntas</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card className="shadow-sm mb-2 rounded">
                <Card.Title style={{ marginBottom: 0 }}><i className="fas fa-times float-right p-2"></i></Card.Title>
                <Card.Body style={{ padding: "0px 1.25rem 1.25rem 1.25rem" }}>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos fugiat, libero dolores numquam illo veniam nemo nostrum sunt, voluptatem, molestias a excepturi modi. Accusantium repudiandae ipsam dolore facilis inventore quis?</p>
                    <div className="text-center">
                        <Button style={{ width: "40%" }} variant="primary" size="sm">Sí</Button><Button className="ml-2" style={{ width: "40%" }} variant="danger" size="sm">No</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card className="shadow-sm mb-2 rounded">
                <Card.Body>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos fugiat, libero dolores numquam illo veniam nemo nostrum sunt, voluptatem, molestias a excepturi modi. Accusantium repudiandae ipsam dolore facilis inventore quis?</p>
                    <div className="text-center">
                        <Button style={{ width: "40%" }} variant="primary" size="sm" disabled={true}>50%</Button><Button className="ml-2" style={{ width: "40%" }} disabled={true} variant="danger" size="sm">50%</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>;
    }
}
