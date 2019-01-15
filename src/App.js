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
      changedExpensesChildrenOver6StayingRegardless: false,
      changedExpensesChildrenOver6DependingOnStaying: false,
      changedUnnecessaryExpensesChildrenUnder6: false,
      changedTreatmentSumSoleCustody: false,
      changedStayingMother: false,
      changedNetSalaryMother:false,
      changedNetSalaryFather:false,
      ChangedExpensesMadorMother:false,
      changedExpensesMadorFather:false,
     
    }
  }

  handleChange = (event) => {
    let val = parseFloat(event.target.value);
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
      case "stayingMother":
                this.props.Parameters.stayingMother = val;
                this.setState({ changedStayingMother: true }); break;
      case "netSalaryMother":
               this.props.Parameters.netSalaryMother = val;
               this.setState({changedNetSalaryMother:true}); break;
      case "netSalaryFather":
               this.props.Parameters.netSalaryFather = val; 
               this.setState({changedNetSalaryFather:true}); break;
      case "expensesMadorMother":
               this.props.Parameters.expensesMadorMother = val;
               this.setState({ChangedExpensesMadorMother:true}); break;
      case "expensesMadorFather":
               this.props.Parameters.expensesMadorFather = val;
               this.setState({changedExpensesMadorFather:true}); break;
      case "expensesChildrenOver6StayingRegardless":
               this.props.Parameters.expensesChildrenOver6StayingRegardless = val;
               this.setState({ changedExpensesChildrenOver6StayingRegardless: true }); break;
      case "expensesChildrenOver6DependingOnStaying":
               this.props.Parameters.expensesChildrenOver6DependingOnStaying = val;
               this.setState({ changedExpensesChildrenOver6DependingOnStaying: true }); break;
      case "unnecessaryExpensesChildrenUnder6":
               this.props.Parameters.unnecessaryExpensesChildrenUnder6 = val;
               this.setState({ changedUnnecessaryExpensesChildrenUnder6: true }); break;
      case "treatmentSumSoleCustody":
                this.props.Parameters.treatmentSumSoleCustody = val;
                this.setState({ changedTreatmentSumSoleCustody: true }); break;
      default: break;
    }
  }

  handleChangeSelect = (event) => {
    switch (event.target.id) {
      case "CoordinatorParent": this.props.Parameters.coordinatorParent = event.target.value; break;
      case "childrenUnder6": this.props.Parameters.childrenUnder6 = event.target.value; break;
      case "childrenOver6": this.props.Parameters.childrenOver6 = event.target.value; break;
      default: break;
    }

  }

  handleSubmit = (event) => {
    this.setState({ submit: true });
  }
  makeSoleCustosyAppearOrDisappear = (event) => {
    this.props.Parameters.calcCustodyKind > 0 ? this.setState({ soleCustody: true }) : this.setState({ soleCustody: false });
  }


  render() {
    let arrayOfNumbers = [];
    for (let i = 0; i <= 20; i++) {
      arrayOfNumbers.push(i);
    };
    let numberOptions = arrayOfNumbers.map((num) => <option value={num}>{num}</option>);


    return (
      <div className="thePage">
        <div className="bothTitle"><h1 className="rkmanComputer"> מחשבון רקמן</h1>
          <h5 className="costParentDevos" >חישוב מזונות להורים גרושים</h5></div>
        <div className="dataChild"> נתוני ילדים</div>

        <div className="nam0fChildrenOver6">
          <div className="text">  מספר ילדים מתחת לגיל 6</div>
          <select className="selectBox" id="childrenUnder6" value={this.props.Parameters.childrenUnder6} onChange={(event) => this.handleChangeSelect(event)}>
            {numberOptions}
          </select>
        </div>

        <div className="nam0fChildrenOver6">
          <div className="text">  מספר ילדים מעל גיל 6   </div>
          <select className="selectBox" id="childrenOver6" value={this.props.Parameters.childrenOver6} onChange={(event) => this.handleChangeSelect(event)}>
            {numberOptions}
          </select>
        </div>

        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text"> צורכי ילדים מעל גיל 6 - לא תלויי שהות (הולך למרכז) </div>
          <input className="input" id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={this.state.changedExpensesChildrenOver6StayingRegardless ? this.props.Parameters.expensesChildrenOver6StayingRegardless : ""} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text"> צורכי ילדים מעל גיל 6 תלויי שהות </div>
          <input className="input" id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={this.state.changedExpensesChildrenOver6DependingOnStaying ? this.props.Parameters.expensesChildrenOver6DependingOnStaying : ""} onChange={(event) => this.handleChange(event)} />
        </div>

        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text" > צורכי ילדים מתחת לגיל 6 - לא הכרחיות </div>
          <input className="input" id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={this.state.changedUnnecessaryExpensesChildrenUnder6 ? this.props.Parameters.unnecessaryExpensesChildrenUnder6 : ""} onChange={(event) => this.handleChange(event)} />
        </div>


        {this.state.soleCustody ?
          <div className="nam0fChildrenOver6BlakGreen">
            <div className="text"> עלות משמורן יחיד</div>
            <input className="input" id="treatmentSumSoleCustody" type="number" min={0} value={this.state.changedTreatmentSumSoleCustody ? this.props.Parameters.treatmentSumSoleCustody : ""} onChange={(event) => this.handleChange(event)} />
          </div>
          :
          " "
        }


        <div className="dataChild">נתוני הורים</div>
        <div className="mamAndDad">
          <p className="momData">אם </p>
          <p className="DadData">אב</p>
        </div>

        <div className="nam0fChildren">
          <div className="text">ימי שהות מתוך 14</div>
          <input className="inputStayingMom" id="stayingMother" type="number" step={0.5} min={0} max={14} value={this.state.changedStayingMother ? this.props.Parameters.stayingMother : ""} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.makeSoleCustosyAppearOrDisappear(event)} />
          <div className="fortnight"> {this.props.Parameters.stayingFather} </div>
        </div>


        <div className="nam0fChildren">
          <div className="text" >הכנסה נטו</div>
          <input className="inputFirst" id="netSalaryMother" type="number" min={0} value={this.state.changedNetSalaryMother ? this.props.Parameters.netSalaryMother : ""} onChange={(event) => this.handleChange(event)} />
          <input className="inputSecond" id="netSalaryFather" type="number" min={0} value={this.state.changedNetSalaryFather ? this.props.Parameters.netSalaryFather : ""} onChange={(event) => this.handleChange(event)} />

        </div>


        <div className="nam0fChildren">
          <div className="text"> עלות מדור </div>
          <input className="inputFirst" id="expensesMadorMother" type="number" min={0} value={this.state.ChangedExpensesMadorMother ? this.props.Parameters.expensesMadorMother : ""} onChange={(event) => this.handleChange(event)} />
          <input className="inputSecond" id="expensesMadorFather" type="number" min={0} value={this.state.changedExpensesMadorFather ? this.props.Parameters.expensesMadorFather : ""} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="nam0fChildren">
          <div className="text"> הורה מרכז</div>
          <select className="selectBox" id="CoordinatorParent" value={this.props.Parameters.coordinatorParent} onChange={(event) => this.handleChangeSelect(event)}>
            <option value="mother"> אמא</option>
            <option value="father"> אבא </option>
          </select>
        </div>

        <div>
          <br /> <br />

          <button className="button" onClick={(event) => this.handleSubmit(event)}> חשב </button>
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