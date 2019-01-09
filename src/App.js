import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
//import { observer } from 'mobx';

@observer(['Parameters'])
class App extends Component {

  // onBlur = (event) => {
  //   let val = parseInt(event.target.value);
  //   if (!val) { // val = NaN
  //     this.props.Parameters[event.target.id] = 0
  //     //  val = 0;
  //   }
  // }

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
      case "childrenUnder6": this.props.Parameters.childrenUnder6 = val; break;
      case "childrenOver6": this.props.Parameters.childrenOver6 = val; break;
      case "stayingMother": this.props.Parameters.stayingMother = val; break;
      case "netSalaryMother": this.props.Parameters.netSalaryMother = val; break;
      case "netSalaryFather": this.props.Parameters.netSalaryFather = val; break;
      case "expensesMadorMother": this.props.Parameters.expensesMadorMother = val; break;
      case "expensesMadorFather": this.props.Parameters.expensesMadorFather = val; break;
      case "expensesChildrenOver6StayingRegardless": this.props.Parameters.expensesChildrenOver6StayingRegardless = val; break;
      case "unnecessaryExpensesChildrenUnder6": this.props.Parameters.unnecessaryExpensesChildrenUnder6 = val; break;
      case "treatmentSumSoleCustody": this.props.Parameters.treatmentSumSoleCustody = val; break;
      case "expensesChildrenOver6DependingOnStaying": this.props.Parameters.expensesChildrenOver6DependingOnStaying = val; break;
    }
  }

  handleCangeCoordinatorParent = (event) => {
    this.props.Parameters.coordinatorParent = event.target.value;
  }

  render() {
    return (
      <div className="thePage">
        <div className="bothTitle"><h1 className="rkmanComputer"></h1>מחשבון רקמן
        <h5 className="costParentDevos" >חישוב מזונות להורים גרושים</h5></div>

        <div className="dataChild"> נתוני ילדים</div>
        <div className="nam0fChildrenOver6">
          <div className="text">   מספר ילדים מתחת לגיל 6</div>
          <div>  <input className="input" id="childrenUnder6" type="number" min="0" max={60} value={this.props.Parameters.childrenUnder6} onChange={(event) => this.handleChange(event)} />
          </div>
        </div>

        <div className="nam0fChildrenOver6">

          <div className="text">  מספר ילדים מעל גיל 6   </div>
          <input className="input" id="childrenOver6" type="number" min="0" max={60} value={this.props.Parameters.childrenOver6} onChange={(event) => this.handleChange(event)} />

        </div>

        <div className="nam0fChildrenOver6">
          <div className="text"> צורכי ילדים מעל גיל 6 - לא תלויי שהות (הולך למרכז) </div>
          <input className="input" id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={this.props.Parameters.expensesChildrenOver6StayingRegardless} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="nam0fChildrenOver6">
          <div className="text"> צורכי ילדים מעל גיל 6 תלויי שהות </div>
          <input className="input" id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={this.props.Parameters.expensesChildrenOver6DependingOnStaying} onChange={(event) => this.handleChange(event)} />
        </div>

        <div className="nam0fChildrenOver6">
          <div className="text" > צורכי ילדים מתחת לגיל 6 - לא הכרחיות </div>
          <input className="input"
            id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={this.props.Parameters.unnecessaryExpensesChildrenUnder6} onChange={(event) => this.handleChange(event)} />
        </div>

        <div> הכנס נתוני הורים</div>

        <div className="dataChild">נתוני הורים</div>
        <div className="mamAndDad"> <p className="momData">אם </p>
          <p className="DadData">אב</p></div>

        <div className="num0fChildren">
          <div className="text">ימי שהות מתוך 14</div>
          <input className="inputStayingMom" id="stayingFirstParent" type="number" min={0} max={14} value={this.props.Parameters.stayingFirstParent} onChange={(event) => this.handleChangeChildrenNum(event)} />
          <div className="fortnight"> {this.props.Parameters.stayingSecondParent}</div>
      </div>


          <div className="nam0fChildren">
            <div className="text" >הכנסה נטו</div>
            <input className="inputFirst" id="netSalaryFirstParent" type="number" min={0} value={this.props.Parameters.netSalaryFirstParent} onChange={(event) => this.handleChangeChildrenNum(event)} />
            <input className="inputSecond" id="netSalarySecondParent" type="number" min={0} value={this.props.Parameters.netSalarySecondParent} onChange={(event) => this.handleChangeChildrenNum(event)} />

          </div>


          <div className="nam0fChildren">
            <div className="text"> עלות מדור </div>
            <input className="inputFirst" id="expensMadorOne" type="number" min={0} value={this.props.Parameters.expensMadorOne} onChange={(event) => this.handleChangeChildrenNum(event)} />
            <input className="inputSecond" id="expensMadorTwo" type="number" min={0} value={this.props.Parameters.expensMadorTwo} onChange={(event) => this.handleChangeChildrenNum(event)} />
          </div>


          <label>
            <b> הורה מרכז: </b>
            <select value={this.props.Parameters.coordinatorParent} onChange={(event) => this.handleCangeCoordinatorParent(event)}>
              <option value="mother"> אמא</option>
              <option value="father"> אבא </option>
            </select>
          </label>

        </div>
      
    );

  }
}
export default App;