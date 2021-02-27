import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import { connect } from 'react-redux';
import fb from "../firebase";
import { ANSWERS_COLLECTION, APT_COLLECTION } from '../constants/constants';

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};


class Chart extends React.Component {
    subscription = null;
    state = {
        question: "",
        answers: [],
        apts: [],
        unsubscribe: false,
        visible: false,
        series: [0, 0],
        options: {
            chart: {
                type: 'donut'
            },
            labels: ['Sí', 'No'],
            fill: {
                opacity: 1
            },
            stroke: {
                width: 1,
                colors: undefined
            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    }
                }
            },
            theme: {

            }
        },
    }

    componentDidMount() {
        fb.collection(APT_COLLECTION).where("building", "==", this.props.building.id).get()
            .then(res => {
                const apts = []
                for (const d of res.docs) {
                    apts.push({ ...d.data(), id: d.id })
                }
                this.setState({ apts })
            })
    }

    getResults() {
        const yes = this.state.answers.filter((m) => m.approve).slice().map(m => m.apartment);
        const no = this.state.answers.filter((m) => !m.approve).slice().map(m => m.apartment);;

        const apartments = this.state.apts;

        const yesApts = apartments.filter(m => yes.includes(m.id));
        const noApts = apartments.filter(m => no.includes(m.id));


        let auxY = 0, auxN = 0;
        for (const y of yesApts) {
            auxY += parseFloat(y.coef);
        }
        for (const n of noApts) {
            auxN += parseFloat(n.coef);
        }

        this.setState({ series: [auxY, auxN] })
    }

    getAnswers(question) {
        this.subscription = fb.collection(ANSWERS_COLLECTION).where("question", "==", question).onSnapshot(qs => {
            const answers = []
            for (const a of qs.docs) {
                answers.push({ ...a.data() })
            }
            this.setState({ answers }, () => {
                this.getResults()
            })
        })
    }


    static getDerivedStateFromProps(props, state) {
        if (props.question !== state.question) {
            let unsubscribe = false;
            if (props.question) {
                unsubscribe = true
            }
            return {
                question: props.question,
                unsubscribe,
                visible: props.question ? true : false
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Infginito?");
        if (this.state.unsubscribe && this.subscription !== null && this.props.question) {
            this.setState({ unsubscribe: false }, () => {
                this.subscription()
                this.getAnswers(this.props.question)
            })
        }
        if (this.state.unsubscribe && this.subscription === null && this.props.question) {
            this.setState({ unsubscribe: false }, () => {
                this.getAnswers(this.props.question)
            })
        }
        if (!this.state.unsubscribe && !this.props.question && this.subscription !== null) {
            this.subscription()
        }
    }

    render() {
        return <div style={{ height: "80vh", marginTop: "20px" }}>
            
            {this.state.visible && <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="100%" height="100%" />}
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)