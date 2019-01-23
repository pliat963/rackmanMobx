import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './changePermanentData.css';
import App from './App';



//import { observer } from 'mobx';
@observer(['Parameters'])

class ChangePermanentData extends Component {

    constructor(props) {
        super(props);
        this.state = { topic: 'toChangePermanentData',successSave:'false',check:true };
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
        this.setState({successSave:true})
        let shortcut = this.props.Parameters;

        shortcut.tempNumOfDaysInAYear && (shortcut.numOfDaysInAYear = shortcut.tempNumOfDaysInAYear);
        shortcut.tempMinNightsSoThatItIsNotSelfCustody && (shortcut.minNightsSoThatItIsNotSelfCustody = shortcut.tempMinNightsSoThatItIsNotSelfCustody);
        shortcut.tempMaxNightDiffForJointCustody && (shortcut.maxNightDiffForJointCustody = shortcut.tempMaxNightDiffForJointCustody);
        shortcut.tempMinSumForLivingToThePayer && (shortcut.minSumForLivingToThePayer = shortcut.tempMinSumForLivingToThePayer);
        shortcut.tempSumForKidUnder6 && (shortcut.sumForKidUnder6 = shortcut.tempSumForKidUnder6);
        shortcut.tempPercentageFromFatherInJointCustody && (shortcut.percentageFromFatherInJointCustody = shortcut.tempPercentageFromFatherInJointCustody);
    }

    handleChange = (event) => {
        this.setState({successSave:false})
        
        let val = parseInt(event.target.value);
        // if (!val) { // val = NaN
        //     val = 0;
        // }
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
                        <div >ימים בשנה</div>
                        <input id="numOfDaysInAYear" type="number" min="0" max={370} value={this.props.Parameters.tempNumOfDaysInAYear} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill"  >
                        <div >מינימום לילות שלא תהיה משמורת יחידה</div>
                        <input id="minNightsSoThatItIsNotSelfCustody" type="number" min="0" max={14} value={this.props.Parameters.tempMinNightsSoThatItIsNotSelfCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill" >
                        <div>מספר לילות כדי שתהיה משמורת משותפת</div>
                        <input id="maxNightDiffForJointCustody" type="number" min="0" max={14} value={this.props.Parameters.tempMaxNightDiffForJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>

                    <div className="cellToFill">
                        <div>  סכום מינימלי למחיה שנשאר להורה המשלם-כולל מדור</div>
                        <input id="minSumForLivingToThePayer" type="number" min="0" value={this.props.Parameters.tempMinSumForLivingToThePayer} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>סכום לילד מתחת לגיל 6</div>
                        <input id="sumForKidUnder6" type="number" min="0" value={this.props.Parameters.tempSumForKidUnder6} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div className="cellToFill">
                        <div>אחוזי ההורדה מהאב במקרה של משמורת משותפת</div>
                        <span  className="modolo">%</span> 
                    <input id="percentageFromFatherInJointCustody" type="number" min="0" max={100} value={this.props.Parameters.tempPercentageFromFatherInJointCustody} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div>
                        <br /> <br />


                       <button  className="buttonData" onClick={() => this.clickSave()}>  שמור  </button>
                        
                        <button className="buttonData" onClick={() => this.clickTopic('toTheCalculator')}>למחשבון </button>
                        {(this.state.successSave===true ? <div>השמירה התבצעה בהצלחה </div> :"")}
                    </div>
                </div> 
                :
                <div className="container">
                <button className="buttonData" onClick={() => this.clickTopic('toChangePermanentData')}> בחזרה להגדרת נתונים קבועים </button>
                <br/><br/>
                <App   />
             
              
                </div>
               
        );

    }
}
export default ChangePermanentData;
