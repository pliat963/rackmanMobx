import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
//import { observer } from 'mobx';

@observer(['Parameters'])
class App extends Component {
  constructor(props) {
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
    if (event.target.max) // if max exists
    {
      if (val > event.target.max) {
        val = parseInt(event.target.max);
      }
    }

    switch (event.target.id) {
      case "childrenUnder6": this.props.Parameters.childrenUnder6 = val; break;
      case "childrenOver6": this.props.Parameters.childrenOver6 = val; break;
      case "stayingFirstParent": this.props.Parameters.stayingFirstParent = val; break;
      case "netSalaryFirstParent": this.props.Parameters.netSalaryFirstParent = val; break;
      case "netSalarySecondParent": this.props.Parameters.netSalarySecondParent = val; break;
      case "expensMadorOne": this.props.Parameters.expensMadorOne = val; break;
      case "expensMadorTwo": this.props.Parameters.expensMadorTwo = val; break;
      case "expensesChildrenOver6StayingRegardless": this.props.Parameters.expensesChildrenOver6StayingRegardless = val; break;
      case "unnecessaryExpensesChildrenUnder6": this.props.Parameters.unnecessaryExpensesChildrenUnder6 = val; break;
      case "treatmentSumSoleCustody": this.props.Parameters.treatmentSumSoleCustody = val; break;
    }
  }

  render() {
    return (
      <div className="thePage">
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
        <div> חלק הילדים במדור: % {this.props.Parameters.childrenMador} </div>
        <hr />

        <h3> נתוני הורים </h3>
        <table border="1px solid black" className="table table-striped">
          <tbody>
            <tr>
              <td>  </td>
              <td> הורה א </td>
              <td> הורה ב </td>
            </tr>
            <tr>
              <td> שהות: </td>
              <td>
                <input id="stayingFirstParent" type="number" min={0} max={14} value={this.props.Parameters.stayingFirstParent} onChange={(event) => this.handleChangeChildrenNum(event)} />
              </td>
              <td> {this.props.Parameters.stayingSecondParent}  </td>
            </tr>
            <tr>
              <td> הכנסה נטו מכל מקור: </td>
              <td> <input id="netSalaryFirstParent" type="number" min={0} value={this.props.Parameters.netSalaryFirstParent} onChange={(event) => this.handleChangeChildrenNum(event)} /> </td>
              <td> <input id="netSalarySecondParent" type="number" min={0} value={this.props.Parameters.netSalarySecondParent} onChange={(event) => this.handleChangeChildrenNum(event)} /> </td>
            </tr>
            <tr>
              <td>  מדור (עלות) </td>
              <td> <input id="expensMadorOne" type="number" min={0} value={this.props.Parameters.expensMadorOne} onChange={(event) => this.handleChangeChildrenNum(event)} /> </td>
              <td> <input id="expensMadorTwo" type="number" min={0} value={this.props.Parameters.expensMadorTwo} onChange={(event) => this.handleChangeChildrenNum(event)} /> </td>
              <td> מדור מינימלי : {this.props.Parameters.minMador} </td>
            </tr>
            <tr>
              <td>  סה"כ הכנסות:</td>
              <td> {this.props.Parameters.totalSalaryFirstParentPercentage} % </td>
              <td> {this.props.Parameters.totalSalarySecondParentPercentage} % </td>
            </tr>
            <tr>
              <td> זמני שהות: </td>
              <td>  {this.props.Parameters.stayingPercentageFirstParent} % </td>
              <td> {this.props.Parameters.stayingPercentageSecondParent} %  </td>
            </tr>
            <tr>
              <td>  שהות מחושבת: </td>
              <td> {this.props.Parameters.calculatedStayingPerFortnightFirstParent} </td>
              <td>  {this.props.Parameters.calculatedStayingPerFortnightSecondParent}  </td>
            </tr>
            <tr>
              <td> ימים: </td>
              <td> {this.props.Parameters.calculatedDaysInYearFirstParent} </td>
              <td> {this.props.Parameters.calculatedDaysInYearSecondParent} </td>
            </tr>
            <tr>
              <td>שיפמן:  </td>
              <td> {this.props.Parameters.calcShifmanFirstPar} % </td>
              <td> {this.props.Parameters.calcShifmanSecondPar} % </td>
              <td>{this.props.Parameters.calcCustodyKind}</td>
              <td>{this.props.Parameters.calcBeenResponPar}</td>
            </tr>
          </tbody>
        </table>
        {/* lalalala */}




        <hr />
        <h3> צורכי ילדים</h3>
        <table border="1px solid black" className="table table-striped">
          <tbody>
            <tr>
              <td>צורכי ילדים </td>
              <td> </td>
              <td> האב</td>
              <td> האם </td>
              <td> מחושב לפי יחס</td>
            </tr>
            <tr>
              <td>מחושב לפי הכנסות</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>צורכי ילדים מעל גיל 6 - לא תלוי שהות (הולך למרכז) </td>
              <td> <input id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={this.props.Parameters.expensesChildrenOver6StayingRegardless} onChange={(event) => this.handleChangeChildrenNum(event)} /></td>
              <td> {this.props.Parameters.expensesChildrenOver6StayingRegardlessFirstParent}</td>
              <td>{this.props.Parameters.expensesChildrenOver6StayingRegardlessSecondParent} </td>
              <td>הכנסות</td>
            </tr>
            <tr>
              <td>צורכי ילדים מתחת לגיל 6 - לא הכרחיות </td>
              <td><input id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={this.props.Parameters.unnecessaryExpensesChildrenUnder6} onChange={(event) => this.handleChangeChildrenNum(event)} /> </td>
              <td>{this.props.Parameters.unnecessaryExpensesChildrenUnder6FirstParent} </td>
              <td>{this.props.Parameters.unnecessaryExpensesChildrenUnder6SecondParent}</td>
              <td>הכנסות</td>
            </tr>
            <tr>
              <td>דמי טיפול Sole Custody  </td>
              <td> <input id="treatmentSumSoleCustody" type="number" min={0} value={this.props.Parameters.treatmentSumSoleCustody} onChange={(event) => this.handleChangeChildrenNum(event)} /></td>
              <td> {this.props.Parameters.treatmentSumSoleCustodyFirstPar}</td>
              <td> {this.props.Parameters.treatmentSumSoleCustodySecondPar} </td>
              <td>משמורן יחיד = מרכז</td>
            </tr>
            {/* <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr> */}
            {/* <tr>
              <td>צורכי ילדים מתחת 6 - הכרחיות - מחושב.  האב משלם (100% או 60%) </td>
              <td> {this.state.nessesaryChildUnder6Needs}</td>
              <td> {this.state.fatherNeedsToPayForKidsUnder6} </td>
              <td> 0 </td>
              <td>חובת האב </td>
            </tr> */}
            {/* <tr>
              <td>מדור  מתחת לגיל 6 - מחושב לפי מדור האם </td>
              <td> {this.state.motherMadorUnder6}</td>
              <td> </td>
              <td> aaa</td>
              <td>חובת האב</td>
            </tr> */}
            {/* <tr>

            </tr> */}
            {/* <tr>
              <td>צרכי ילדים מעל גיל 6 - שהות - מחושב לפי נוסחת וועדת שיפמן </td>
              <td> <input id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={this.state.motherMadorUnder6} onChange={(event) => this.handleChangeMotherMadorUnder6(event)} /></td>
              <td> aaa</td>
              <td>aaa </td>
            </tr> */}
            {/* <tr>
              <td>מדור מעל גיל 6: משמורת משותפת לעני - משמורת יחידה למשמורן </td>
              <td> aaa</td>
              <td> aaa</td>
              <td>aaa </td>
            </tr> */}
            {/* <tr>

            </tr> */}
            <tr>
              <td>ההורה הלא מרכז משלם את הוצאות הצד השני </td>
              <td> aaa</td>
              <td> {this.props.Parameters.ifSecondParentIsCoordinatorThenFirstNeedsToPay}</td>
              <td> {this.props.Parameters.ifFirstParentIsCoordinatorThenSecondNeedsToPay}</td>
            </tr>
            {/* <tr>
              <td>האב תמיד משלם </td>
              <td> aaa</td>
              <td> aaa</td>
              <td>aaa </td>
            </tr>
            <tr> */}
            {/* <td>לפי החישוב (שיפמן) היחסי </td>
              <td> aaa</td>
              <td> aaa</td>
              <td>aaa </td>
            </tr> */}
            {/* <tr>
              <td> סך הכל </td>
              <td> aaa</td>
              <td> aaa</td>
              <td>aaa </td>
            </tr> */}

          </tbody>
        </table>


      </div>
    );

  }
}
export default App;