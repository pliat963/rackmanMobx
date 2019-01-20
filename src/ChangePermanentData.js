import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './changePermanentData.css';
import App from './App';



//import { observer } from 'mobx';
@observer(['Parameters'])

class ChangePermanentData extends Component {

    constructor(props) {
        super(props);
        this.state = { topic: 'toChangePermanentData' };
        this.clickTopic = this.clickTopic.bind(this);
    }
    clickTopic = (whereToGo) => {
        if (whereToGo === 'toTheCalculator') {
            this.setState({ topic: "toTheCalculator" });
        } else if (whereToGo === "toChangePermanentData") {
            this.setState({ topic: "toChangePermanentData" });
        }
    }

    handleChange = (event) => {
        let val = parseInt(event.target.value);
        if (!val) { // val = NaN
            val = 0;
        }
        if (event.target.max) // if max exists
        {
            if (val > event.target.max) {
                val = parseInt(event.target.max);
            }
        }

        switch (event.target.id) {
            case "numOfDaysInAYear": this.props.Parameters.numOfDaysInAYear = val; break;
            case "minNightsSoThatItIsNotSelfCustody": this.props.Parameters.minNightsSoThatItIsNotSelfCustody = val; break;
            case "maxNightDiffForJointCustody": this.props.Parameters.maxNightDiffForJointCustody = val; break;
            case "minSumForLivingToThePayer": this.props.Parameters.minSumForLivingToThePayer = val; break;
            case "sumForKidUnder6": this.props.Parameters.sumForKidUnder6 = val; break;
            case "percentageFromFatherInJointCustody": this.props.Parameters.percentageFromFatherInJointCustody = val; break;
            default: break;
        }
    }


    render() {

        return (
            this.state.topic === "toChangePermanentData" ?
                <div className="thePage">
                    <div className="backgroundTitle"><h1 className="title"> שינוי נתונים קבועים </h1></div>
                    <br></br>
                    <div className="cellToFill"  >
                        <div >ימים בשנה:</div>
                        <input id="numOfDaysInAYear" type="number" min="0" max={370} value={this.props.Parameters.numOfDaysInAYear} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill"  >
                        <div >מינימום לילות שלא תהיה משמורת יחידה:</div>
                        <input id="minNightsSoThatItIsNotSelfCustody" type="number" min="0" max={14} value={this.props.Parameters.minNightsSoThatItIsNotSelfCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill" >
                        <div>מספר לילות כדי שתהיה משמורת משותפת:</div>
                        <input id="maxNightDiffForJointCustody" type="number" min="0" max={14} value={this.props.Parameters.maxNightDiffForJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div className="cellToFill">
                        <div>  סכום מינימלי למחיה שנשאר להורה המשלם-כולל מדור:</div>
                        <input id="minSumForLivingToThePayer" type="number" min="0" value={this.props.Parameters.minSumForLivingToThePayer} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>סכום לילד מתחת לגיל 6:</div>
                        <input id="sumForKidUnder6" type="number" min="0" value={this.props.Parameters.sumForKidUnder6} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>אחוזי ההורדה מהאב במקרה של משמורת משותפת:</div> %
                    <input id="percentageFromFatherInJointCustody" type="number" min="0" max={100} value={this.props.Parameters.percentageFromFatherInJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div>
                        <br /> <br />

                        <button className="button" onClick={() => this.clickTopic('toTheCalculator')}>מחשבון </button>
                       
                    </div>
                </div> 
                :
                <div>
                <App/>
                <button className="button" onClick={() => this.clickTopic('toChangePermanentData')}> בחזרה להגדרת נתונים קבועים </button>
                </div>
        );

    }
}
export default ChangePermanentData;