import React from 'react';
import './App.css';
import Question from './components/Question'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import styled from '@emotion/styled';
import Vote from './components/Vote'
import Login from './components/Login'
import Users from './components/Users'



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

const Cart3 = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 92%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;

const Cart4 = styled.div `
    border-radius: 3px;
    margin: 0;
    position: absolute;
    top: 12%;
    left: 85%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 16%;
`;


function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowVote, setModalShowVote] = React.useState(false);
  const [modalShowLogin, setModalShowLogin] = React.useState(false);
  const [modalShowUsers, setModalShowUsers] = React.useState(false);


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
      <Cart3>
        <Button variant="primary" onClick={() => setModalShowLogin(true)}>
          Registro usuario
        </Button>
      </Cart3>
      <Cart4>
        <Button variant="primary" onClick={() => setModalShowUsers(true)}>
          Crear usuario
        </Button>
      </Cart4>
      <Question
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Vote
        show={modalShowVote}
        onHide={() => setModalShowVote(false)}
      />
      <Users
        show={modalShowUsers}
        onHide={() => setModalShowUsers(false)}
      />
      <Login
        show={modalShowLogin}
        onHide={() => setModalShowLogin(false)}
      />
    </>
  );
}

export default App;
