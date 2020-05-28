import React, { Component } from 'react';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { setApartament } from '../actions';
import { APT_COLLECTION } from "../constants/constants";
import fb from '../firebase';

const mapDispatchToProps = (dispatch) => {
    return {
        setApartament(apartament) {
            dispatch(setApartament(apartament))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

class Login extends Component {
    state = {
        loading: false,
        error: "",
        appartment: "",
        password: ""
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    //TODO: Validar cuando el usuario sea administrador
    login() {
        this.setState({ loading: true })
        fb.collection(APT_COLLECTION).where("number", "==", parseInt(this.state.appartment))
            .where("password", "==", this.state.password).get()
            .then((qs) => {
                if (qs.docs.length === 0) { // Usuario o contraseña incorrectas
                    this.setState({ error: "Apartamento o contraseña incorreta" })
                } else {
                    const apartament = qs.docs[0].data();
                    if (!apartament.admin) {
                        if (this.props.residential) {
                            if (apartament.residential !== this.props.residential.id) {// El apartamento no pertenece a la residencial de la conferencia
                                this.setState({ error: "Usted no puede unirse a esta conferencia." })
                            } else { // Ok
                                this.props.setApartament({ ...apartament, id: qs.docs[0].id });
                                this.props.onComplete();
                            }
                        } else {
                            this.setState({ error: "Usted no puede unirse a esta conferencia." })
                        }


                    } else { // Ok
                        this.props.setApartament({ ...apartament, id: qs.docs[0].id });
                        this.props.onComplete();
                    }
                }
                this.setState({ loading: false })
            }).catch((error) => {
                console.log(error);
                this.setState({ error: "Ha ocurrido un error inesperado." })
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <Modal show={this.props.show} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Iniciar sesión
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert
                        show={this.state.error !== ""}
                        variant="danger"
                        onClose={() => {
                            this.setState({ error: "" });
                        }}
                        dismissible
                    >
                        {this.state.error}
                    </Alert>
                    <Form autoComplete="off" onSubmit={this.login.bind(this)}>
                        <Form.Group>
                            <Form.Label>Apartamento</Form.Label>
                            <Form.Control
                                name="appartment"
                                type="text"
                                autoComplete="off"
                                value={this.state.appartment}
                                onChange={this.handleInputChange}
                                placeholder="ingrese el número del apartamento"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                placeholder="Ingrese su contraseña"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        disabled={this.state.loading}
                        onClick={this.login.bind(this)}>
                        Iniciar
                    {this.state.loading && <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true" />}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
