import { observable, computed } from "mobx";

class Parameters {
//permanent data    
@observable numOfDAysInAYear = 365;
@observable minNightsSoThatItIsNotSelfCustody = 2;
@observable maxNightDiffForJointCustody = 4;
@observable minSumForLivingToThePayer = 4000;
@observable sumForKidUnder6 = 1300;
@observable percentageFromFatherInJointCustody = 40;

//fitst table - parents data
@observable childrenUnder6 = 0;
@observable childrenOver6 = 0;
@observable stayingFirstParent = 0;
@observable netSalaryFirstParent = 0;
@observable netSalarySecondParent = 0;
@observable expensMadorOne = 0;
@observable expensMadorTwo = 0;

//things to calculate and not show
@observable custodyKind = 0;

//second table
@observable expensesChildrenOver6StayingRegardless = 0;
@observable unnecessaryExpensesChildrenUnder6 = 0;
@observable treatmentSumSoleCustody = 0;

//fitst table - parents data
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
    return Math.min(this.expensMadorOne, this.expensMadorTwo);
}
@computed get totalSalaryFirstParentPercentage(){
    let totalSalary = this.netSalaryFirstParent + this.netSalarySecondParent;
    if (totalSalary == 0)
        return 0;
    else {
        return this.netSalaryFirstParent * 100 / totalSalary;
    }
}
@computed get totalSalarySecondParentPercentage(){
    let totalSalary = this.netSalaryFirstParent + this.netSalarySecondParent;
    if (totalSalary == 0)
        return 0;
    else {
        return this.netSalarySecondParent * 100 / totalSalary;
    }
}

@computed get stayingPercentageFirstParent(){
    let stayingPercentageFirstParent;
    let calculatedDaysInYearFirstParent = this.calculatedDaysInYearFirstParent;
    stayingPercentageFirstParent = calculatedDaysInYearFirstParent / this.numOfDAysInAYear * 100;
    return stayingPercentageFirstParent;
}

@computed get stayingPercentageSecondParent(){
    let stayingPercentageSecondParent;
    let calculatedDaysInYearSecondParent = this.calculatedDaysInYearSecondParent;
    stayingPercentageSecondParent = calculatedDaysInYearSecondParent / this.numOfDAysInAYear * 100;
    return stayingPercentageSecondParent;
}

@computed get calculatedStayingPerFortnightFirstParent (){
    if (this.stayingFirstParent > (13 - this.minNightsSoThatItIsNotSelfCustody)) {
        return 14;
    }
    else {
        if (this.stayingFirstParent < (1 + this.minNightsSoThatItIsNotSelfCustody)) {
            return 0;
        }
        else {
            return this.stayingFirstParent;
        }
    }
}

@computed get calculatedStayingPerFortnightSecondParent () {
    return 14 - this.calculatedStayingPerFortnightFirstParent;
}

@computed get calculatedDaysInYearFirstParent () {
    let calculatedDaysInYearFirstParent;
    let calculatedStayingPerFortnightFirstParent = this.calculatedStayingPerFortnightFirstParent;
    calculatedDaysInYearFirstParent = calculatedStayingPerFortnightFirstParent / 14 * this.numOfDAysInAYear;
    return calculatedDaysInYearFirstParent;
}

@computed get calculatedDaysInYearSecondParent () {
    let calculatedDaysInYearSecondParent;
    let calculatedStayingPerFortnightSecondParent = this.calculatedStayingPerFortnightSecondParent;
    calculatedDaysInYearSecondParent = calculatedStayingPerFortnightSecondParent / 14 * this.numOfDAysInAYear;
    return calculatedDaysInYearSecondParent;
}

@computed get calcShifmanFirstPar () {
    let calcShifmanFirstPar;
    calcShifmanFirstPar = this.totalSalaryFirstParentPercentage - this.stayingPercentageFirstParent;
    return calcShifmanFirstPar;
  }

  @computed get calcShifmanSecondPar () {
    let calcShifmanSecondPar;
    calcShifmanSecondPar = this.totalSalarySecondParentPercentage - this.stayingPercentageSecondParent;
    return calcShifmanSecondPar;
  }

   //things to calculate and not show
   
  @computed get calcCustodyKind (){
    if (Math.abs(this.stayingFirstParent - this.stayingSecondParent) < this.maxNightDiffForJointCustody) {
        return 0;
        }
      else {
          //first parent
        if (this.stayingFirstParent > this.stayingSecondParent) {
          return 1;         
        }
         //second parent
        else
          return 2;
}
  }
   @computed get calcBeenResponPar () //change to calcCoordinatorParent?
  {
    if (this.calcCustodyKind > 0) {
        return this.calcCustodyKind;
      }
      else {
        if (this.coordinatorParent === "mother") {
          return 1;
        }
        else {
          return  2;
        }
      }
    
  
  }


     //second table
     @computed get expensesChildrenOver6StayingRegardlessFirstParent () {
        let salaryPercFirst = this.totalSalaryFirstParentPercentage/100;
        return this.expensesChildrenOver6StayingRegardless * salaryPercFirst;
     }
     @computed get expensesChildrenOver6StayingRegardlessSecondParent () {
        let salaryPercSecond = this.totalSalarySecondParentPercentage/100;
        return this.expensesChildrenOver6StayingRegardless * salaryPercSecond;
    }

    @computed get unnecessaryExpensesChildrenUnder6FirstParent () {
        let salaryPercFirst = this.totalSalaryFirstParentPercentage/100;
        return this.unnecessaryExpensesChildrenUnder6 * salaryPercFirst;
    }
    @computed get unnecessaryExpensesChildrenUnder6SecondParent () {
        let salaryPercSecond = this.totalSalarySecondParentPercentage/100;
        return this.unnecessaryExpensesChildrenUnder6 * salaryPercSecond;
    }

    @computed get treatmentSumSoleCustodyFirstPar () {
        if (this.calcCustodyKind ==2) {
            return this.treatmentSumSoleCustody;
        } else {return 0;};
    }
    @computed get treatmentSumSoleCustodySecondPar () {
        if (this.calcCustodyKind ==1) {
            return this.treatmentSumSoleCustody;
        } else {return 0;};
    }



    //after the yellow

    @computed get ifSecondParentIsCoordinatorThenFirstNeedsToPay() {
        let sum = 0;
        if (this.calcBeenResponPar == 2) {
            sum = (this.expensesChildrenOver6StayingRegardlessSecondParent 
                    + this.unnecessaryExpensesChildrenUnder6SecondParent
                    + this.treatmentSumSoleCustodySecondPar);
        } else {sum =0};
        return sum;
    }
    @computed get ifFirstParentIsCoordinatorThenSecondNeedsToPay() {
        let sum = 0;
        if (this.calcBeenResponPar == 1) {
            sum = (this.expensesChildrenOver6StayingRegardlessFirstParent 
                    + this.unnecessaryExpensesChildrenUnder6FirstParent
                    + this.treatmentSumSoleCustodyFirstPar);
        } else {sum =0};
        return sum;
    }




















    
}

export default new Parameters;