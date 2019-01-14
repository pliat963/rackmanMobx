import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
//import { observer } from 'mobx';
@observer(['Parameters'])

    class ChangePermanentData extends Component {
        handleCangeminNightsSoThatItIsNotSelfCustody = (event) => {
          this.props.Parameters.minNightsSoThatItIsNotSelfCustody = event.target.value;
        }
          handleCangemaxNightDiffForJointCustody = (event) => {
            this.props.Parameters.maxNightDiffForJointCustody = event.target.value;
          }
          handleCangeminSumForLivingToThePayer = (event) => {
            this.props.Parameters.minSumForLivingToThePayer = event.target.value;
          }
          handleCangesumForKidUnder6 =(event) =>{
            this.props.Parameters.sumForKidUnder6 = event.target.value;
          }
          handleCangepercentageFromFatherInJointCustody =(event) =>{
            this.props.Parameters.sumForKidUnder6 = event.target.value;
          }
          handleTable =(event) =>{
           
          }


render(){
return(
<div  className="thePage">
<div className="bothTitle"><h1 className="rkmanComputer">  נתונים קבועים</h1></div>
<br></br>
<div className="nam0fChildrenOver6"  >
<div >מינימום לילות שלא תהיה משמורת יחידה</div>
    <input className="input" id="minNightsSoThatItIsNotSelfCustody" type="number" min="0" value={this.props.Parameters.minNightsSoThatItIsNotSelfCustody} onChange={(event) => this. handleCangeminNightsSoThatItIsNotSelfCustody(event)} />
</div>
<div className="nam0fChildrenOver6" >
<div>מספר לילות כדי שיהיה משמורת משותפת</div>
    <input className="input" id="maxNightDiffForJointCustody" type="number" min="0" value={this.props.Parameters.maxNightDiffForJointCustody} onChange={(event) => this. handleCangemaxNightDiffForJointCustody(event)} />
</div>

<div  className="nam0fChildrenOver6">
<div>  סכום מינימלי למחיה שנשאר להורה המשלם-כולל מדור</div>
    <input className="input" id="minSumForLivingToThePayer" type="number" min="0"  value={this.props.Parameters.minSumForLivingToThePayer} onChange={(event) => this. handleCangeminSumForLivingToThePayer(event)} />
</div>
<div   className="nam0fChildrenOver6">
<div>סכום לילד מתחת לגיל 6</div>
    <input className="input" id="sumForKidUnder6" type="number" min="0"  value={this.props.Parameters.sumForKidUnder6} onChange={(event) => this. handleCangesumForKidUnder6(event)} />
</div>
<div   className="nam0fChildrenOver6">
<div>אחוזי ההורדה מהאב במקרה של משמורת משותפת</div>
    <input className="input" id="percentageFromFatherInJointCustody" type="number" min="0"  value={this.props.Parameters.percentageFromFatherInJointCustody} onChange={(event) => this. handleCangepercentageFromFatherInJointCustody(event)} />
</div>


</div>
);


}





    }
    export default ChangePermanentData;