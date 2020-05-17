import React,{ Fragment , useState} from 'react';
import './App.css';
import Question from './components/Question'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import styled from '@emotion/styled';
import Vote from './components/Vote'

const Cart = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 35%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;

const Cart2 = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 62%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;

function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowVote, setModalShowVote] = React.useState(false);

  return (
    <>
      <Cart>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Crear pregunta
        </Button>
      </Cart>
      <Cart2>
        <Button variant="primary" onClick={() => setModalShowVote(true)}>
          Votar pregunta
        </Button>
      </Cart2>
      <Question
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Vote
        show={modalShowVote}
        onHide={() => setModalShowVote(false)}
      />
    </>
  );
}

export default App;
