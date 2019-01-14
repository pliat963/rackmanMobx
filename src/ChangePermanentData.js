import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
//import { observer } from 'mobx';
@observer(['Parameters'])

class ChangePermanentData extends Component {

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
            <div className="thePage">
                <div className="bothTitle"><h1 className="rkmanComputer">  נתונים קבועים</h1></div>
                <br></br>
                <div className="nam0fChildrenOver6"  >
                    <div >ימים בשנה:</div>
                    <input className="input" id="numOfDaysInAYear" type="number" min="0" max={370} value={this.props.Parameters.numOfDaysInAYear} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="nam0fChildrenOver6"  >
                    <div >מינימום לילות שלא תהיה משמורת יחידה:</div>
                    <input className="input" id="minNightsSoThatItIsNotSelfCustody" type="number" min="0" max={14} value={this.props.Parameters.minNightsSoThatItIsNotSelfCustody} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="nam0fChildrenOver6" >
                    <div>מספר לילות כדי שתהיה משמורת משותפת:</div>
                    <input className="input" id="maxNightDiffForJointCustody" type="number" min="0" max={14} value={this.props.Parameters.maxNightDiffForJointCustody} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="nam0fChildrenOver6">
                    <div>  סכום מינימלי למחיה שנשאר להורה המשלם-כולל מדור:</div>
                    <input className="input" id="minSumForLivingToThePayer" type="number" min="0" value={this.props.Parameters.minSumForLivingToThePayer} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="nam0fChildrenOver6">
                    <div>סכום לילד מתחת לגיל 6:</div>
                    <input className="input" id="sumForKidUnder6" type="number" min="0" value={this.props.Parameters.sumForKidUnder6} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="nam0fChildrenOver6">
                    <div>אחוזי ההורדה מהאב במקרה של משמורת משותפת:</div> %
                    <input className="input" id="percentageFromFatherInJointCustody" type="number" min="0" max={100} value={this.props.Parameters.percentageFromFatherInJointCustody} onChange={(event) => this.handleChange(event)} />
                </div>
            </div>
        );

    }
}
export default ChangePermanentData;