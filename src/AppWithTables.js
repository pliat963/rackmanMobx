import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './AppWithTables.css';
//import { observer } from 'mobx';

@observer(['Parameters'])
class AppWithTables extends Component {

  // onBlur = (event) => {
  //   let val = parseInt(event.target.value);
  //   if (!val) { // val = NaN
  //     this.props.Parameters[event.target.id] = 0
  //     //  val = 0;
  //   }
  // }

  handleChange = (event) => {
    let val = parseInt(event.target.value);
    // if (!val) { // val = NaN
    //   val = 0;
    // }
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

  render() {
    return (
      <div className="thePage">
        <h3> נתונים קבועים </h3>

        <div> מספר ימים בשנה : {this.props.Parameters.numOfDaysInAYear} </div>
        <div> מינימום לילות שלא תהיה משמורת יחידה : {this.props.Parameters.minNightsSoThatItIsNotSelfCustody} </div>
        <div> הפרש מקסימלי בין מספר לילות כדי שתהיה משמורת משותפת : {this.props.Parameters.maxNightDiffForJointCustody}</div>
        <div> סכום מינימלי למחייה שנשאר להורה המשלם : {this.props.Parameters.minSumForLivingToThePayer}</div>
        <div> סכום לילד מתחת לגיל 6 : {this.props.Parameters.sumForKidUnder6}</div>
        <div> אחוזי ההורדה מהאב במקרה של משמורת משותפת : % {this.props.Parameters.percentageFromFatherInJointCustody} </div>
        <hr />



        <h3> מספר ילדים </h3>
        <div>
          <label>
            מספר ילדים מתחת לגיל 6:
               <input id="childrenUnder6" type="number" min="0" max={60} value={this.props.Parameters.childrenUnder6} onChange={(event) => this.handleChange(event)} />
          </label>
        </div>

        <div>
          <label>
            מספר ילדים מעל גיל 6:
               <input id="childrenOver6" type="number" min="0" max={60} value={this.props.Parameters.childrenOver6} onChange={(event) => this.handleChange(event)} />
          </label>
        </div>
        <div> חלק הילדים במדור: % {this.props.Parameters.childrenMador} </div>
        <hr />

        <h3> נתוני הורים </h3>
        <table border="1px solid black" className="table table-striped">
          <tbody>
            <tr>
              <td>  </td>
              <td> הורה א - האמא </td>
              <td> הורה ב - האבא </td>
            </tr>
            <tr>
              <td> שהות: </td>
              <td>
                <input id="stayingMother" type="number" min={0} max={14} value={this.props.Parameters.stayingMother} onChange={(event) => this.handleChange(event)} />
              </td>
              <td> {this.props.Parameters.stayingFather}  </td>
            </tr>
            <tr>
              <td> הכנסה נטו מכל מקור: </td>
              <td> <input id="netSalaryMother" type="number" min={0} value={this.props.Parameters.netSalaryMother} onChange={(event) => this.handleChange(event)} /> </td>
              <td> <input id="netSalaryFather" type="number" min={0} value={this.props.Parameters.netSalaryFather} onChange={(event) => this.handleChange(event)} /> </td>
            </tr>
            <tr>
              <td>  מדור (עלות) </td>
              <td> <input id="expensesMadorMother" type="number" min={0} value={this.props.Parameters.expensesMadorMother} onChange={(event) => this.handleChange(event)} /> </td>
              <td> <input id="expensesMadorFather" type="number" min={0} value={this.props.Parameters.expensesMadorFather} onChange={(event) => this.handleChange(event)} /> </td>
              <td> מדור מינימלי : {this.props.Parameters.minMador} </td>
            </tr>
            <tr>
              <td>  סה"כ הכנסות:</td>
              <td> {this.props.Parameters.totalSalaryMotherPercentage} % </td>
              <td> {this.props.Parameters.totalSalaryFatherPercentage} % </td>
            </tr>
            <tr>
              <td> זמני שהות: </td>
              <td>  {this.props.Parameters.stayingPercentageMother} % </td>
              <td> {this.props.Parameters.stayingPercentageFather} %  </td>
            </tr>
            <tr>
              <td>  שהות מחושבת: </td>
              <td> {this.props.Parameters.calculatedStayingPerFortnightMother} </td>
              <td>  {this.props.Parameters.calculatedStayingPerFortnightFather}  </td>
            </tr>
            <tr>
              <td> ימים: </td>
              <td> {this.props.Parameters.calculatedDaysInYearMother} </td>
              <td> {this.props.Parameters.calculatedDaysInYearFather} </td>
            </tr>
            <tr>
              <td>שיפמן:  </td>
              <td> {this.props.Parameters.calcShifmanMother} % </td>
              <td> {this.props.Parameters.calcShifmanFather} % </td>
              <td>{this.props.Parameters.calcCustodyKind}</td>
              <td>{this.props.Parameters.calcCoordinatorParent}</td>
            </tr>
          </tbody>
        </table>

        <label>
          <b> הורה מרכז: </b>
          <select value={this.props.Parameters.coordinatorParent} onChange={(event) => this.handleCangeCoordinatorParent(event)}>
            <option value="mother"> אמא</option>
            <option value="father"> אבא </option>
          </select>
        </label>   
       
        <hr />
        <h3> צורכי ילדים</h3>
        <table border="1px solid black" className="table table-striped">
          <tbody>
            <tr>
              <td>צורכי ילדים </td>
              <td> </td>
              <td> האם </td>
              <td> האב</td>
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
              <td> <input id="expensesChildrenOver6StayingRegardless" type="number" min={0} value={this.props.Parameters.tempExpensesChildrenOver6StayingRegardless} onChange={(event) => this.handleChange(event)} /></td>
              <td> {this.props.Parameters.expensesChildrenOver6StayingRegardlessMother}</td>
              <td> {this.props.Parameters.expensesChildrenOver6StayingRegardlessFather} </td>
              <td>הכנסות</td>
            </tr>
            <tr>
              <td>צורכי ילדים מתחת לגיל 6 - לא הכרחיות </td>
              <td><input id="unnecessaryExpensesChildrenUnder6" type="number" min={0} value={this.props.Parameters.tempUnnecessaryExpensesChildrenUnder6} onChange={(event) => this.handleChange(event)} /> </td>
              <td>{this.props.Parameters.unnecessaryExpensesChildrenUnder6Mother} </td>
              <td>{this.props.Parameters.unnecessaryExpensesChildrenUnder6Father}</td>
              <td>הכנסות</td>
            </tr>
            <tr>
              <td>דמי טיפול Sole Custody  </td>
              <td> <input id="treatmentSumSoleCustody" type="number" min={0} value={this.props.Parameters.tempTreatmentSumSoleCustody} onChange={(event) => this.handleChange(event)} /></td>
              <td> {this.props.Parameters.treatmentSumSoleCustodyMother}</td>
              <td> {this.props.Parameters.treatmentSumSoleCustodyFather} </td>
              <td>משמורן יחיד = מרכז</td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
            <tr>
              <td>צורכי ילדים מתחת 6 - הכרחיות - מחושב.  האב משלם (100% או 60%) </td>
              <td> {this.props.Parameters.nessesaryChildUnder6Needs}</td>
              <td> 0 </td>
              <td> {this.props.Parameters.fatherNeedsToPayForKidsUnder6}  </td>
              <td>חובת האב </td>
            </tr>
            <tr>
              <td>מדור  מתחת לגיל 6 - מחושב לפי מדור האם </td>
              <td> {this.props.Parameters.motherMadorUnder6}</td>
              <td> </td>
              <td> {this.props.Parameters.motherMadorUnder6FatherPays}</td>
              <td>חובת האב</td>
            </tr>
            <tr>

            </tr>
            <tr>
              <td>צרכי ילדים מעל גיל 6 - שהות - מחושב לפי נוסחת וועדת שיפמן </td>
              <td> <input id="expensesChildrenOver6DependingOnStaying" type="number" min={0} value={this.props.Parameters.tempExpensesChildrenOver6DependingOnStaying} onChange={(event) => this.handleChange(event)} /></td>
              <td>{this.props.Parameters.expensesChildrenOver6DependingOnStayingForMother} </td>
              <td>{this.props.Parameters.expensesChildrenOver6DependingOnStayingForFather}</td>
              <td>שיפמן</td>
            </tr>
            <tr>
              <td>מדור מעל גיל 6: משמורת משותפת לעני - משמורת יחידה למשמורן </td>
              <td> {this.props.Parameters.madorOver6}</td>
              <td>{this.props.Parameters.madorOver6Mother} </td>
              <td> {this.props.Parameters.madorOver6Father}</td>
              <td>שיפמן</td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td>ההורה הלא מרכז משלם את הוצאות הצד השני </td>
              <td> </td>
              <td> {this.props.Parameters.ifFatherIsCoordinatorThenMotherNeedsToPay}</td>
              <td> {this.props.Parameters.ifMotherIsCoordinatorThenFatherNeedsToPay}</td>
            </tr>
            <tr>
              <td>האב תמיד משלם </td>
              <td> </td>
              <td> </td>
              <td> {this.props.Parameters.fatherAlwaysPays} </td>
            </tr>
            <tr>
              <td>לפי החישוב (שיפמן) היחסי </td>
              <td> </td>
              <td>{this.props.Parameters.accordingToRelativeCalculationShifmanMother} </td>
              <td>{this.props.Parameters.accordingToRelativeCalculationShifmanFather}</td>
            </tr>
            <tr>
              <td> סך הכל </td>
              <td> </td>
              <td> {this.props.Parameters.totalSumMother}</td>
              <td> {this.props.Parameters.totalSumFather} </td>
            </tr>
           
            <tr>
              <td></td>
              <td> הפרשים</td>
              <td> סכום מקסימלי אחרי התחשבות במינימום שכר</td>
              <td> סכום לתשלום </td>
            </tr>
            <tr>
              <td> לפיכך יעביר האב לאם עבור מזונות</td>
              <td> {this.props.Parameters.differencesFather}</td>
              <td> {this.props.Parameters.maxRegardingMinSalaryFather}</td>
              <td> {this.props.Parameters.toPayFather} </td>
            </tr>
            <tr>
              <td> לפיכך תעביר האם לאב עבור מזונות</td>
              <td> {this.props.Parameters.differencesMother}</td>
              <td> {this.props.Parameters.maxRegardingMinSalaryMother}</td>
              <td> {this.props.Parameters.toPayMother} </td>
            </tr>
          </tbody>
        </table>



      </div>
    );

  }
}
export default AppWithTables;