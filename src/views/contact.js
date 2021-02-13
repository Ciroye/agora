// import '../assets/CSS/contacto.css'
import React, { useState } from 'react';

const Contact = () => {
    const frmContact = {
        firstName: "",
        lastName: "",
        email: " ",
        country: "",
        municipio: " ",
        comments: " ",
    };
    const [contact, setContact] = useState(frmContact);
    const [showMessage, setShowMessage] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();


        //    emailjs.send('default_service','template_OpH5xNz6', contact, 'user_ToDl38rGdKCfMgVbafyk0')
        //    .then((response) => {
        //               console.log('SUCCESS!', response.status, response.text);
        //               setContact(frmContact);
        //               setShowMessage(true);
        //    }, (err) => {
        //               console.log('FAILED...', err);
        //    });
    }


    return (
        <div className="contenedor-contacto ">

            { showMessage ? <div className="alert alert-success col-md-5 mx-auto" role="alert">Mensaje Enviado!!</div> : `` }
            <div className="col-md-5 p-lg-4 my-5 ml-4">
                <h1 className="contacto font-weight-normal text-center text-white"> CONTÁCTANOS </h1>
                <p className="parrafo-contacto lead font-weight-normal text-white px-0 ml-">
                    Si te interesa nuestro portafolio puedes contactarnos para trabajar juntos!! .</p>


                <form onSubmit={ handleSubmit } className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className=" col-md-6 mb-3">
                                    <label className="text-white">Nombre</label>
                                    <input onChange={ handleChange } name="firstName" value={ contact.firstName } type="text" className="form-control" id="firstName" placeholder="Nombre/s" />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                          </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="text-white">Apellido</label>
                                    <input onChange={ handleChange } name="lastName" value={ contact.lastName } type="text" className="form-control" id="lastName" placeholder="Apellidos" />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                          </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="text-white">Correo Electrónico</label>
                                    <input onChange={ handleChange } name="email" value={ contact.email } type="email" className="form-control" id="email" placeholder=" ejemplo@ejemplo.com"></input>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-white">Pais</label>
                                    <select className="custom-select d-block w-100" name="country" value={ contact.country } onChange={ handleChange } id="country" >
                                        <option value="" >Selecciona...</option>
                                        <option>Colombia</option>
                                        <option>Otro</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                              </div>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="text-white">Municipio</label>
                                    <select onChange={ handleChange } className="custom-select d-block w-100" name="municipio" value={ contact.municipio } id="municipio" >
                                        <option value="" >Selecciona...</option>
                                        <option>Medellín</option>
                                        <option>Abejorral</option>
                                        <option>Amagá</option>
                                        <option>Amalfi</option>
                                        <option>Andes</option>
                                        <option>Bello</option>
                                        <option>Caldas</option>
                                        <option>Copacabana</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                              </div>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="text-white">Comentarios</label>
                                    <input onChange={ handleChange } name="comments" value={ contact.comments } type="textarea" className="form-control" id="comments" placeholder="PQRS" />
                                    <div className="invalid-feedback">
                                        Please enter your comments.
                                          </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className=" justify-content-center text-center">
                        <a className="btn btn-outline-light text-center" href="">ENVIAR</a>
                    </div>

                </form>
            </div>
        </div>


    );
}


export default Contact;




