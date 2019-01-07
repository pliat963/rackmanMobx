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
 case "stayingFirstParent": this.props.Parameters.stayingFirstParent=val; break;
 case "netSalaryFirstParent": this.props.Parameters.netSalaryFirstParent=val; break;
 case "netSalarySecondParent": this.props.Parameters.netSalarySecondParent=val; break;
 case "expensMadorOne":this.props.Parameters.expensMadorOne= val; break;
 case "expensMadorTwo":this.props.Parameters.expensMadorTwo= val; break;
 
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
      </div>
    );
    
  }
}
export default App;