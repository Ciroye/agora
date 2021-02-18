import React, { Component } from 'react';
import { Navbar, Button, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { setQuestion } from '../actions';
import fb from "../firebase";
import { ANSWERS_COLLECTION } from '../constants/constants';

const mapDispatchToProps = (dispatch) => {
    return {
        setQuestion(question) {
            dispatch(setQuestion(question))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};
class Question extends Component {

    state = {
        hasVote: false,
        answers: []
    };


    componentDidMount() {
        fb.collection(ANSWERS_COLLECTION).where("apartment", "==", this.props.apartment.id).where("question", "==", this.props.data.id).onSnapshot((qs) => {
            if (qs.docs.length > 0) {
                console.log(this.props.data.id + " : " + this.props.data.title + " : Tiene votos");
                this.setState({ hasVote: true })
            }
        })

        fb.collection(ANSWERS_COLLECTION).where("question", "==", this.props.data.id).onSnapshot((snap) => {
            const answers = snap.docs.map((m) => {
                return {
                    id: m.id,
                    ...m.data()
                }
            })
            this.setState({ answers })
        })
    }


    getResults() {
        // const yes = this.state.answers.filter((m) => m.approve).slice().map(m => m.apartment);
        // const no = this.state.answers.filter((m) => !m.approve).slice().map(m => m.apartment);;

        // const apartaments = this.props.apartaments;

        // const yesApts = apartaments.filter(m => yes.includes(m.id));
        // const noApts = apartaments.filter(m => no.includes(m.id));


        // let auxY = 0, auxN = 0;
        // for (const y of yesApts) {
        //     auxY += parseFloat(y.cof);
        // }
        // for (const n of noApts) {
        //     auxN += parseFloat(n.cof);
        // }

        // return {
        //     yes: auxY,
        //     no: auxN
        // }
    }

    setQuestion = () => {
        this.props.setQuestion(this.props.data.id)
    }

    vote = (decision) => {
        fb.collection(ANSWERS_COLLECTION).add({
            apartment: this.props.apartment.id,
            approve: decision,
            question: this.props.data.id
        })
        console.log(this.props.data.id + " : " + this.props.data.title + " : Voto?");
        this.setState({ hasVote: true })
    }

    render() {
        const { hasVote } = this.state;
        return <Card className="shadow-sm mb-2 rounded" key={this.props.key}>
            {this.props.apartment.admin && <Card.Title style={{ marginBottom: 0 }}><i className="fas fa-times float-right p-2"></i></Card.Title>}
            <Card.Body style={{ padding: (this.props.apartment.admin ? "0px" : "1.25rem") + " 1.25rem 1.25rem 1.25rem" }}>
                <p>{this.props.data.title}</p>
                <div className="text-center">
                    <Button style={{ width: hasVote ? "25%" : "40%" }} disabled={this.state.hasVote} onClick={() => { this.vote(true) }} variant="primary" size="sm" >Sí</Button>
                    <Button disabled={this.state.hasVote} onClick={() => { this.vote(false) }} className="ml-2" style={{ width: hasVote ? "25%" : "40%" }} variant="danger" size="sm">No</Button>
                    {hasVote && <Button onClick={() => { this.setQuestion() }} className="ml-2" style={{ width: "25%" }} variant="info" size="sm">Ver resultados</Button>}
                </div>
            </Card.Body>
        </Card>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)