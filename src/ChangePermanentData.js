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

    clickSave = () =>{
        this.props.Parameters.numOfDaysInAYear = this.props.Parameters.tempNumOfDaysInAYear;
        this.props.Parameters.minNightsSoThatItIsNotSelfCustody = this.props.Parameters.tempMinNightsSoThatItIsNotSelfCustody;
        this.props.Parameters.maxNightDiffForJointCustody = this.props.Parameters.tempMaxNightDiffForJointCustody;
        this.props.Parameters.minSumForLivingToThePayer = this.props.Parameters.tempMinSumForLivingToThePayer;
        this.props.Parameters.sumForKidUnder6 = this.props.Parameters.tempSumForKidUnder6;
        this.props.Parameters.percentageFromFatherInJointCustody=this.props.Parameters.tempPercentageFromFatherInJointCustody;
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
            case "numOfDaysInAYear": this.props.Parameters.tempNumOfDaysInAYear = val; break;
            case "minNightsSoThatItIsNotSelfCustody": this.props.Parameters.tempMinNightsSoThatItIsNotSelfCustody = val; break;
            case "maxNightDiffForJointCustody": this.props.Parameters.tempMaxNightDiffForJointCustody = val; break;
            case "minSumForLivingToThePayer": this.props.Parameters.tempMinSumForLivingToThePayer = val; break;
            case "sumForKidUnder6": this.props.Parameters.tempSumForKidUnder6 = val; break;
            case "percentageFromFatherInJointCustody": this.props.Parameters.tempPercentageFromFatherInJointCustody = val; break;
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
                        <input id="numOfDaysInAYear" type="number" min="0" max={370} value={this.props.Parameters.tempNumOfDaysInAYear} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill"  >
                        <div >מינימום לילות שלא תהיה משמורת יחידה:</div>
                        <input id="minNightsSoThatItIsNotSelfCustody" type="number" min="0" max={14} value={this.props.Parameters.tempMinNightsSoThatItIsNotSelfCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill" >
                        <div>מספר לילות כדי שתהיה משמורת משותפת:</div>
                        <input id="maxNightDiffForJointCustody" type="number" min="0" max={14} value={this.props.Parameters.tempMaxNightDiffForJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div className="cellToFill">
                        <div>  סכום מינימלי למחיה שנשאר להורה המשלם-כולל מדור:</div>
                        <input id="minSumForLivingToThePayer" type="number" min="0" value={this.props.Parameters.tempMinSumForLivingToThePayer} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>סכום לילד מתחת לגיל 6:</div>
                        <input id="sumForKidUnder6" type="number" min="0" value={this.props.Parameters.tempSumForKidUnder6} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>אחוזי ההורדה מהאב במקרה של משמורת משותפת:</div> %
                    <input id="percentageFromFatherInJointCustody" type="number" min="0" max={100} value={this.props.Parameters.tempPercentageFromFatherInJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div>
                        <br /> <br />


                       <button  className="buttonData" onClick={() => this.clickSave()}>  שמור  </button>
                        <button className="buttonData" onClick={() => this.clickTopic('toTheCalculator')}>למחשבון </button>
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