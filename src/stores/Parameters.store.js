import { observable , computed, action } from "mobx";

class Parameters {
    @observable childrenUnder6 = 0;
    @observable childrenOver6 = 0;
    @observable stayingFirstParent =0;
    @observable netSalaryFirstParent =0;
    @observable netSalarySecondParent =0;
    @observable expensMadorOne = 0;
    @observable expensMadorTwo = 0;
    @ observable calculatedDaysInYearFirstParent = 0;
    @ observable calculatedStayingPerFortnightSecendParentVar =0;
    @ observable calculatedStayingPerFortnightFirstParentVar= 0;
    
    constructor(props) {
    
        this.numOfDAysInAYear = 365;
        this.minNightsSoThatItIsNotSelfCustody = 2;
        this.maxNightDiffForJointCustody = 4;
        this.minSumForLivingToThePayer = 4000;
        this.sumForKidUnder6 = 1300;
        this.percentageFromFatherInJointCustody = 40;
      }

    @computed get childrenMador(){
        let numOfChildren = this.childrenOver6 + this.childrenUnder6;
        if (numOfChildren !== 0) {
            if (numOfChildren > 2) { return 55 }
            else {
              if (numOfChildren > 1) { return 40 }
              else {
                if (numOfChildren === 1) {
                  return 33;
                }
                else {
                  return 0;
                }
              }
      
            }
      
          } else { return 0 }
    }
    @computed get stayingSecondParent(){
        return 14 - this.stayingFirstParent;
    }

    @computed get minMador() {
       return  Math.min(this.expensMadorOne, this.expensMadorTwo);
    }
    @computed get totalSalaryFirstParentPercentage (){
        let totalSalary= this.netSalaryFirstParent+this.netSalarySecondParent;
        if(totalSalary==0)
        return 0;
        else{
            return this.netSalaryFirstParent*100/totalSalary;
        }
    }
    @computed get totalSalarySecondParentPercentage (){
        let totalSalary= this.netSalaryFirstParent+this.netSalarySecondParent;
        if(totalSalary==0)
        return 0;
        else{
            
            return this.netSalarySecondParent*100/totalSalary;

        }
    }
    @ computed get calculatedStayingPerFortnightFirstParent(){
        if(this.stayingFirstParent> 13 - this.minNightsSoThatItIsNotSelfCustody){

       return  14;
        }
        else {
            if(this.stayingFirstParent<1+this.minNightsSoThatItIsNotSelfCustody){
               
               return 0;
            }
            else {
                return  this.stayingFirstParent;
            }
        }
    }
    

        @computed get calculatedStayingPerFortnightSecendParent(){
           
            let x = this.calculatedStayingPerFortnightFirstParent;
            return 14 - x;
        }
     
//     @computed get calcDaysInYear (parnt1){
// if(parnt1==mom){
   
//     this. calculatedDaysInYearFirstParent =  this.calculatedStayingPerFortnightSecondParent/14*this.props.app.minNightsSoThatItIsNotSelfCustody
// return this.calculatedStayingPerFortnightSecondParent/14*this.props.app.minNightsSoThatItIsNotSelfCustody 
// }
//     }
    



    
}

export default new Parameters;