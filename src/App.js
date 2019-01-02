import React, { Component } from 'react';
import './App.css';
import { computed } from "mobx";
import { observer } from 'mobx-react';
//import { observer } from 'mobx';

@observer(['Parameters'])
class App extends Component {
  constructor(props){
    super(props);
    this.numOfDAysInAYear = 365;
    this.minNightsSoThatItIsNotSelfCustody = 2;
    this.maxNightDiffForJointCustody = 4;
    this.minSumForLivingToThePayer = 4000;
    this.sumForKidUnder6 = 1300;
    this.percentageFromFatherInJointCustody = 40;
  }

  handleChangeChildrenNum = (event) => {
    let val = parseInt(event.target.value);
    if (!val) { // val = NaN
      val = 0;
    }
    if (val > event.target.max) {
      val = parseInt(event.target.max);
    }
    
    switch (event.target.id) {
      case "childrenUnder6": this.props.Parameters.childrenUnder6 = val; break;
      case "childrenOver6": this.props.Parameters.childrenOver6 = val; break;
    }
  }

  render() {
    return (
      <div className="App">
        <h3> נתונים קבועים </h3>

        <div> מספר ימים בשנה : {this.numOfDAysInAYear} </div>
        <div> מינימום לילות שלא תהיה משמורת יחידה : {this.minNightsSoThatItIsNotSelfCustody} </div>
        <div> הפרש מקסימלי בין מספר לילות כדי שיהיה משמורת משותפת : {this.maxNightDiffForJointCustody}</div>
        <div> סכום מינימלי למחייה שנשאר להורה המשלם : {this.minSumForLivingToThePayer}</div>
        <div> סכום לילד מתחת לגיל 6 : {this.sumForKidUnder6}</div>
        <div> אחוזי ההורדה מהאב במקרה של משמורת משותפת : % {this.percentageFromFatherInJointCustody} </div>
        <hr />

        <h3> מספר ילדים </h3>
        <div>
          <label>
            מספר ילדים מתחת לגיל 6:
    <input id="childrenUnder6" type="number" min="0" max={60} value={this.props.Parameters.childrenUnder6} onChange={(event) => this.handleChangeChildrenNum(event)} />
          </label>
        </div>

        <div>
          <label>
            מספר ילדים מעל גיל 6:
    <input id="childrenOver6" type="number" min="0" max={60} value={this.props.Parameters.childrenOver6} onChange={(event) => this.handleChangeChildrenNum(event)} />
          </label>
        </div>
        <div> חלק הילדים במדור: % {this.props.Parameters.childrenMador}  </div>
        <hr />
      </div>
    );
  }
}

export default App;
