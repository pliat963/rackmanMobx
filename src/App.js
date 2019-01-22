import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';

//import { observer } from 'mobx';

@observer(['Parameters'])
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      soleCustody: false,
       //selects
      changedChildrenUnder6: false,
      changedChildrenOver6: false,
      changedCoordinatorParent: false

    }

    let arrayOfNumbers = [];
    for (let i = 0; i <= 20; i++) {
      arrayOfNumbers.push(i);
    };
    this.numberOptions = arrayOfNumbers.map((num) => <option value={num} key={num.toString()}>{num}</option>);
  }

  // capitalizeFirstLetterAndAddTheStringChanged(string) {
  //   let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
  //   let toReturn = "changed" + capitalized;
  //   return toReturn;
  // }

  handleChange = (event) => {
    this.setState({submit:false});
    let val = parseFloat(event.target.value);
   
    //  let keyInTheState = this.capitalizeFirstLetterAndAddTheStringChanged(event.target.id);
    //  this.setState({ [keyInTheState]: true });

     if (event.target.max) // if max exists
    {
      if (val > event.target.max) {
        val = parseInt(event.target.max);
      }
    }

    switch (event.target.id) {
      case "stayingMother":
        this.props.Parameters.stayingMother = val; break;
      case "netSalaryMother":
        this.props.Parameters.netSalaryMother = val; break;
      case "netSalaryFather":
        this.props.Parameters.netSalaryFather = val; break;
      case "expensesMadorMother":
        this.props.Parameters.expensesMadorMother = val; break;
      case "expensesMadorFather":
        this.props.Parameters.expensesMadorFather = val; break;
      case "expensesChildrenOver6StayingRegardless":
        this.props.Parameters.tempExpensesChildrenOver6StayingRegardless =  val; break;
      case "expensesChildrenOver6DependingOnStaying":
        this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying =  val; break;
      case "unnecessaryExpensesChildrenUnder6":
        this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6 = val; break;
      case "treatmentSumSoleCustody":
        this.props.Parameters.tempTreatmentSumSoleCustody = val; break;
      default: break;
    }
  }

  handleChangeSelect = (event) => {
    this.setState({submit:false});
    let val = parseInt(event.target.value);
    switch (event.target.id) {
      case "CoordinatorParent":
        this.setState({ changedCoordinatorParent: true }); 
        this.props.Parameters.coordinatorParent = event.target.value; break;
      case "childrenUnder6":
      this.setState({ changedChildrenUnder6: true }); 
      this.props.Parameters.childrenUnder6 = val;
           if(val === 0) {
            this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6 = undefined;
          };
       break;
      case "childrenOver6":
        this.setState({ changedChildrenOver6: true }); 
        this.props.Parameters.childrenOver6 = val; 
        if(val === 0) {
          this.props.Parameters.tempExpensesChildrenOver6StayingRegardless = undefined;
          this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying = undefined;
        }; 
        break;
      default: break;
    }

  }

  handleSubmit = (event) => {
    this.setState({ submit: true });
  }
  makeSoleCustosyAppearOrDisappear = (event) => {
    this.props.Parameters.calcCustodyKind > 0 ? this.setState({ soleCustody: true }) : this.setState({ soleCustody: false });
    if (this.props.Parameters.calcCustodyKind === 0) {this.props.Parameters.treatmentSumSoleCustody = 0};
  }


  render() {
   
    return (
      <div className="thePage">      
        <div className="backgroundOfTitle"><br></br><h1 className="theTitle"> מחשבון רקמן</h1>
          <h5 className="subTitle" >חישוב מזונות להורים גרושים</h5></div>
        
        <div className="section">נתוני הורים</div>
        <div className="titlesForTheTable">
          <span className="motherTitle">אם </span>
          <span className="fatherTitle">אב</span>
        </div>

        <div className="rowOfInformation">
          <div className="text">ימי שהות מתוך 14</div>
          <input className="inputs" id="stayingMother" type="number" step={0.5} min={0} max={14} value={(!isNaN(this.props.Parameters.stayingMother) &&this.props.Parameters.stayingMother!==undefined) ? this.props.Parameters.stayingMother.toString(): (this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.makeSoleCustosyAppearOrDisappear(event)} />
          <input className="inputs" id="stayingFather" disabled="disabled" value={this.props.Parameters.stayingFather}  />
        </div>
     

        <div className="rowOfInformation">
          <div className="text" >הכנסה נטו</div>
          <input className="inputs" id="netSalaryMother" type="number" min={0} value={(!isNaN(this.props.Parameters.netSalaryMother)&&this.props.Parameters.netSalaryMother!==undefined)? this.props.Parameters.netSalaryMother.toString(): (this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
          <input className="inputs" id="netSalaryFather" type="number" min={0} value={(!isNaN(this.props.Parameters.netSalaryFather)&&this.props.Parameters.netSalaryFather!==undefined)? this.props.Parameters.netSalaryFather.toString(): (this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="rowOfInformation">
          <div className="text"> עלות מדור </div>
          <input className="inputs" id="expensesMadorMother" type="number" min={0} value={(!isNaN(this.props.Parameters.expensesMadorMother)&&this.props.Parameters.expensesMadorMother!==undefined)? this.props.Parameters.expensesMadorMother.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
          <input className="inputs" id="expensesMadorFather" type="number" min={0} value={(!isNaN(this.props.Parameters.expensesMadorFather)&&this.props.Parameters.expensesMadorFather!==undefined)? this.props.Parameters.expensesMadorFather.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="rowOfInformation">
          <div className="text"> הורה מרכז</div>
          <select className="selectBox" id="CoordinatorParent" value={this.state.changedCoordinatorParent ? this.props.Parameters.coordinatorParent : (this.state.submit? "mother": "בחר/י")} onChange={(event) => this.handleChangeSelect(event)}>
            <option value="choose" key="choose" hidden > בחר/י </option>
            <option value="mother"> אמא</option>
            <option value="father"> אבא </option>
          </select>
        </div>

<div className="secondSection section"> נתוני ילדים</div>

<div className="rowOfInformation childrenFirstTwoRows">
  <div className="text">  מספר ילדים מתחת לגיל 6</div>
  <select className="selectBox" id="childrenUnder6" value={this.state.changedChildrenUnder6 ? this.props.Parameters.childrenUnder6 : (this.state.submit? "0": "בחר/י")} onChange={(event) => this.handleChangeSelect(event)}>
    <option value="choose" key="choose" hidden > בחר/י </option>
    {this.numberOptions}
  </select>
</div>

<div className="rowOfInformation childrenFirstTwoRows">
  <div className="text">  מספר ילדים מעל גיל 6   </div>
  <select className="selectBox" id="childrenOver6" value={this.state.changedChildrenOver6 ? this.props.Parameters.childrenOver6 : (this.state.submit? "0": "בחר/י")} onChange={(event) => this.handleChangeSelect(event)}>
    <option value="choose" key="choose" hidden > בחר/י </option>
    {this.numberOptions}
  </select>
</div>

{this.props.Parameters.childrenOver6 > 0 ?
<div className="rowOfInformation childrenRowOfInformation">
  <div className="text"> צורכי ילדים מעל גיל 6 - לא תלויי שהות (הולך למרכז) </div>
  <input className="inputs" id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={(!isNaN(this.props.Parameters.tempExpensesChildrenOver6StayingRegardless)&&this.props.Parameters.tempExpensesChildrenOver6StayingRegardless!==undefined)? this.props.Parameters.tempExpensesChildrenOver6StayingRegardless.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
</div>
: ""}

{this.props.Parameters.childrenOver6 > 0 ?
<div className="rowOfInformation childrenRowOfInformation">
  <div className="text"> צורכי ילדים מעל גיל 6 תלויי שהות </div>
  <input className="inputs" id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={(!isNaN(this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying)&&this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying!==undefined)? this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
</div>
: ""}

{this.props.Parameters.childrenUnder6 > 0 ?
<div className="rowOfInformation childrenRowOfInformation">
  <div className="text" > צורכי ילדים מתחת לגיל 6 - לא הכרחיות </div>
  <input className="inputs" id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={(!isNaN(this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6)&&this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6!==undefined)? this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
</div>
:"" }

{this.state.soleCustody ?
  <div className="rowOfInformation childrenRowOfInformation">
    <div className="text"> עלות משמורן יחיד</div>
    <input className="inputs" id="treatmentSumSoleCustody" type="number" min={0} value={(!isNaN(this.props.Parameters.tempTreatmentSumSoleCustody)&&this.props.Parameters.tempTreatmentSumSoleCustody!==undefined)? this.props.Parameters.tempTreatmentSumSoleCustody.toString():(this.state.submit? "0": "")} onChange={(event) => this.handleChange(event)} />
  </div>
  :
  " "
}



        <div>
            <button className="submitButton" onClick={(event) => this.handleSubmit(event)}> חשב </button>
        </div>
                      
        {this.state.submit === true ?
          <div className="summary"> {this.props.Parameters.toPayMother > 0 ?
            "לפיכך תעביר האם לאב " + this.props.Parameters.toPayMother
            :
            "לפיכך יעביר האב לאם " + this.props.Parameters.toPayFather
          } </div>
          : ""}
      

      </div>

    );

  }
}
export default App;