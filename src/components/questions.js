import React, { Component } from 'react';
import { Navbar, Button, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import fb from "../firebase";
import { ANSWERS_COLLECTION } from '../constants/constants';

const mapDispatchToProps = (dispatch) => {
    return {
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

        console.log(this.props.data.id);
        fb.collection(ANSWERS_COLLECTION).where("apartment", "==", this.props.apartment.id).where("question", "==", this.props.data.id).onSnapshot((qs) => {
            if (qs.docs.length > 0) {
                console.log(this.props.data.id + " : Tiene votos");
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

    vote = (decision) => {
        fb.collection(ANSWERS_COLLECTION).add({
            apartment: this.props.apartment.id,
            approve: decision,
            question: this.props.data.id
        })
        console.log(this.props.data.title + " : Votando ? wtf?");
        this.setState({ hasVote: true })
    }

    render() {
        return <Card className="shadow-sm mb-2 rounded">
            <Card.Body>
                <p>{this.props.data.title}</p>
                <div className="text-center">
                    <Button style={{ width: "40%" }} disabled={this.state.hasVote} onClick={ ()=> {this.vote(true)} } variant="primary" size="sm" >Sí</Button><Button disabled={this.state.hasVote} onClick={()=> {this.vote(false)} } className="ml-2" style={{ width: "40%" }} variant="danger" size="sm">No</Button>
                </div>
            </Card.Body>
        </Card>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)