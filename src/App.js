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
      soleCustodyPreventEmpty:false,
      
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
      default: break;
    }
  }

  handleCangeCoordinatorParent = (event) => {
    this.props.Parameters.coordinatorParent = event.target.value;
  }

  handleSubmit = (event) => {
    this.setState({ submit: true });
  }
  makeSoleCustosyAppearOrDisappear = (event) => {
    this.props.Parameters.calcCustodyKind > 0 ? this.setState({ soleCustody: true }) : this.setState({ soleCustody: false });
  }
  handleBlurSoleCustody = (event) => {
    let val = event.target.value;
    if (!val) { // val = NaN
      this.setState({soleCustodyPreventEmpty:true});
    }
  }

  render() {
    return (
      <div className="thePage">
        <div className="bothTitle"><h1 className="rkmanComputer"> מחשבון רקמן</h1>
          <h5 className="costParentDevos" >חישוב מזונות להורים גרושים</h5></div>

        <div className="dataChild"> נתוני ילדים</div>
        <div className="nam0fChildrenOver6">
          <div className="text">   מספר ילדים מתחת לגיל 6</div>
          <div>  <input className="input" id="childrenUnder6" type="number" min="0" max={60} value={this.props.Parameters.childrenUnder6 !== 0 ? this.props.Parameters.childrenUnder6 : " "} onChange={(event) => this.handleChange(event)} />
          </div>
        </div>

        <div className="nam0fChildrenOver6">
          <div className="text">  מספר ילדים מעל גיל 6   </div>
          <input className="input" id="childrenOver6" type="number" min="0" max={60}  value=" " onChange={(event) => this.handleChange(event)} />
        </div>

        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text"> צורכי ילדים מעל גיל 6 - לא תלויי שהות (הולך למרכז) </div>
          <input className="input" id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={this.props.Parameters.expensesChildrenOver6StayingRegardless !== 0 ? this.props.Parameters.expensesChildrenOver6StayingRegardless : " "} onChange={(event) => this.handleChange(event)} />
        </div>


        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text"> צורכי ילדים מעל גיל 6 תלויי שהות </div>
          <input className="input" id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={this.props.Parameters.expensesChildrenOver6DependingOnStaying !== 0 ? this.props.Parameters.expensesChildrenOver6DependingOnStaying : " "} onChange={(event) => this.handleChange(event)} />
        </div>

        <div className="nam0fChildrenOver6BlakGreen">
          <div className="text" > צורכי ילדים מתחת לגיל 6 - לא הכרחיות </div>
          <input className="input" id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={this.props.Parameters.unnecessaryExpensesChildrenUnder6 !== 0 ? this.props.Parameters.unnecessaryExpensesChildrenUnder6 : " "} onChange={(event) => this.handleChange(event)} />
        </div>


        {this.state.soleCustody ?
          <div className="nam0fChildrenOver6">
            <div className="text"> עלות משמורן יחיד</div>
            <input className="input" id="treatmentSumSoleCustody" type="number" min={0} value={this.props.Parameters.treatmentSumSoleCustody !== 0 || this.state.soleCustodyPreventEmpty ? this.props.Parameters.treatmentSumSoleCustody : " "} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.handleBlurSoleCustody(event)} />
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
          <input className="inputStayingMom" id="stayingMother" type="number" min={0} max={14} value={this.props.Parameters.stayingMother !== 0 ? this.props.Parameters.stayingMother : " "} onChange={(event) => this.handleChange(event)} onBlur={(event) => this.makeSoleCustosyAppearOrDisappear(event)} />
          <div className="fortnight"> {this.props.Parameters.stayingFather} </div>
        </div>


        <div className="nam0fChildren">
          <div className="text" >הכנסה נטו</div>
          <input className="inputFirst" id="netSalaryMother" type="number" min={0} value={this.props.Parameters.netSalaryMother !== 0 ? this.props.Parameters.netSalaryMother : " "} onChange={(event) => this.handleChange(event)} />
          <input className="inputSecond" id="netSalaryFather" type="number" min={0} value={this.props.Parameters.netSalaryFather !== 0 ? this.props.Parameters.netSalaryFather : " "} onChange={(event) => this.handleChange(event)} />

        </div>


        <div className="nam0fChildren">
          <div className="text"> עלות מדור </div>
          <input className="inputFirst" id="expensesMadorMother" type="number" min={0} value={this.props.Parameters.expensesMadorMother !== 0 ? this.props.Parameters.expensesMadorMother : " "} onChange={(event) => this.handleChange(event)} />
          <input className="inputSecond" id="expensesMadorFather" type="number" min={0} value={this.props.Parameters.expensesMadorFather !== 0 ? this.props.Parameters.expensesMadorFather : " "} onChange={(event) => this.handleChange(event)} />
        </div>


        <div   className="nam0fChildren">
          <div  className="text"> הורה מרכז</div>
          <select className="ParentsRsponsiviNavBar" value={this.props.Parameters.coordinatorParent} onChange={(event) => this.handleCangeCoordinatorParent(event)}>
            <option value="mother"> אמא</option>
            <option value="father"> אבא </option>
          </select>
          </div>

        <div>
          <br/> <br/>
          
          <button className="button" onClick={(event) => this.handleSubmit(event)}> חשב </button>
        </div>

        {this.state.submit === true ?
          <div className = "summary"> {this.props.Parameters.toPayMother > 0 ?
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