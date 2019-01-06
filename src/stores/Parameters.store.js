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
    calcShifmanFirstPar = this.totalSalaryFirstParentPercentage - this.stayingFirstParent;
    return calcShifmanFirstPar;
  }

  @computed get calcShifmanSecondPar () {
    let calcShifmanSecondPar;
    calcShifmanSecondPar = this.totalSalarySecondParentPercentage - this.stayingSecondParent;
    return calcShifmanSecondPar;
  }
     //things to calculate and not show




     //second table
   


    
}

export default new Parameters;