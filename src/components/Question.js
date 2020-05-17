import React, {Fragment, useState, useEffect} from 'react'
import styled from '@emotion/styled';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firebase'
import DropdownButton from 'react-bootstrap/DropdownButton';
  

const Input = styled.input `
    height: calc(1.5em + 1rem + 2px); 
    padding: .5rem 1rem; 
    font-size: .9rem; 
    line-height: 1.5; 
    border-radius: 3px;
    width: 100%;
`;

const Cart1 = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 48%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;

const Cart2 = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 72%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;


function useQuestions () {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('agora').doc("asamblea1").collection('questions').onSnapshot((snapshot) => {
            const newQuestion  = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setQuestions(newQuestion)
        })
    }, [])
    return questions
}


function Question(props) {
    const [title, setNewQestion] = useState('');
    function onSubmit(e) {
        e.preventDefault();
        firebase.firestore().collection('agora').doc("asamblea1").collection('questions').add({
            title,
            options:[{
                title:'Si',
                users:[],
            },
            {
                title:'No',
                users:[],
            }]
        })
        .then(() => {
            setNewQestion('');
            props.onHide();
        })
    }

    const questions = useQuestions();
    return (
        <Fragment>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Crear pregunta
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <div className='form-group '>
                    <Input
                        type="string"
                        className="form-control"
                        placeholder="Crea tu pregunta"
                        onChange = {e => setNewQestion(e.currentTarget.value)}
                        required
                    ></Input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit}> Crear pregunta</Button>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
            </Modal>
            <Cart1>
            {questions.map((question) =>
                <div>
                    <span> {question.title}</span>
                    <li>
                        <span> {question.options[0].title}</span>
                        <span> {question.options[0].users.length}</span>
                    </li>
                    <li>
                        <span> {question.options[1].title}</span>
                        <span> {question.options[1].users.length}</span>
                    </li>
                </div>
            )}
            </Cart1>
            <Cart2>
                <DropdownButton id="dropdown-basic-button" title="Preguntas creadas">
                <ul class="list-group">
                {questions.map((question) => 
                    <li class="list-group-item d-flex justify-content-between align-items-center" key={question.id}>
                        {question.title}
                    </li>
                )}
                </ul>
                </DropdownButton>
            </Cart2>

        </Fragment>
    );
}


export default Question;