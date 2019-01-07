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
@observable  coordinatorParent = '';
 @observable  expensesChildrenOver6DependingOnStaying=0;
 

//things to calculate and not show
@observable custodyKind = 0;


//second table
@observable expensChildrenOver6Val = 0;

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
   
  return
  @computed get calcCustodyKind (){
    if (Math.abs(this.stayingFirstParent - this.stayingSecondParent) < this.maxNightDiffForJointCustody) {
        return 0;
        
      }
      else {
        if (this.stayingFirstParent > this.stayingSecondParent) {
          return 1;
         
        }
        else
          return 2;
}
  }
  @computed get calcBeenResponPar ()
  {
    if (this.calcBeenCustody > 0) {
        return this.calcBeenCustody;
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
   
     @computed get nessesaryChildUnder6Needs  (){
        return this.sumForKidUnder6*this.childrenUnder6;

    }
    @computed get fatherNeedsToPayForKidsUnder6 ()
    {
        if(this.calcCustodyKind===0)
        return (1-this.percentageFromFatherInJointCustody)/100*this.nessesaryChildUnder6Needs;
        else
        return this.nessesaryChildUnder6Needs;
    }
    @computed get motherMadorUnder6 ()
    {
        if(this.childrenUnder6!= 0|| this.childrenOver6!=0)
        return this.childrenMador/100*this.childrenUnder6/(this.childrenUnder6+this.childrenOver6)*this.expensMadorOne
    }
    @computed get motherMadorUnder6ForFather(){
        if(this.calcCustodyKind===0)
    return 0.5* this.motherMadorUnder6;
else
if(this.calcCustodyKind===1)
return this.motherMadorUnder6;
else
return 0;


    }
    @computed get expensesChildrenOver6DependingOnStayingForFather(){
    return Math.max(0,this.expensesChildrenOver6DependingOnStaying*(this.totalSalarySecondParentPercentage-this.stayingPercentageSecondParent));
}
@computed get expensesChildrenOver6DependingOnStayingForMother(){
    return Math.max(0,this.expensesChildrenOver6DependingOnStaying*(this.totalSalaryFirstParentPercentage-this.stayingPercentageFirstParent));
}


}
export default new Parameters;