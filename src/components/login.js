import React, { Fragment, Component } from 'react';
import icon3 from '../assets/IMG/icon3.png';
import '../assets/styles/login.css';
import fb from '../firebase'
import { APT_COLLECTION } from '../constants/constants'
import Footer from '../components/footer'
import { setApartament } from '../actions'
import { connect } from 'react-redux';



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
        password: "",
        name: "",
        error: ""
    }

    handleInputChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    componentDidMount() {
    }

    login=(event)=> {
        event.preventDefault()
        this.setState({ loading: true, error: "" })
        fb.collection(APT_COLLECTION).where("name", "==", this.state.name).where("password", "==", this.state.password).get()
            .then((res) => {
                if (res.docs.length === 0) { // Usuario o contraseña incorrectas
                    this.setState({ error: "Apartamento o contraseña incorreta", loading: false })
                } else {
                    const apartament = res.docs[0].data();
                    if (!apartament.admin) {
                        if (this.props.building) {
                            if (apartament.building !== this.props.building.id) {// El apartamento no pertenece a la residencial de la conferencia
                                this.setState({ error: "Usted no puede unirse a esta conferencia.", loading: false })
                            } else { // Ok
                                this.props.setApartament({ ...apartament, id: res.docs[0].id });
                                this.props.onComplete();
                            }
                        } else {
                            this.setState({ error: "Usted no puede unirse a esta conferencia.", loading: false })
                        }
                    } else { // Ok
                        this.props.setApartament({ ...apartament, id: res.docs[0].id });
                        this.props.onComplete();
                    }
                }
            })
           
    } 
    

    render() {
        const { error, loading } = this.state;
        return (
            <Fragment>
                <div className="container">
                    <br />
                    <br />
                    <br />
                    <div className="row align-items-center" >
                        <form autoComplete="false" className="col-4 offset-4" onSubmit={this.login} >
                            <div className="text-center">
                                <img className="mb-4 text-center " src={icon3} alt="" width="80" height="80" />
                                <h1 className="h6 mb-3 fw-normal"> Iniciar sesión para ingresar a la asamblea</h1>
                            </div>
                            {error && <div className="alert alert-danger" role="alert">
                                {error}
                            </div>}
                            <label className="visually-hidden text-left"> Usuario </label>
                            <input autoComplete="false" onChange={this.handleInputChange} type="text" name="name" className="form-control" placeholder="Usuario" required autoFocus />
                            <br />
                            <label className="visually-hidden"> Contraseña </label>
                            <input autoComplete="false" onChange={this.handleInputChange} type="password" name="password" className="form-control" placeholder="Contraseña" required />
                            <br />
                            {!loading && <button className="w-100 btn btn-lg btn-primary" type="submit" >Iniciar sesión</button>}
                            {loading && <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                        </form>
                    </div>
                </div>
                <br />
                <Footer />
            </Fragment>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)