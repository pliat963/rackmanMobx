import { observable, computed } from "mobx";

class Parameters {
    //permanent data    
    @observable numOfDaysInAYear = 365;
    @observable minNightsSoThatItIsNotSelfCustody = 2;
    @observable maxNightDiffForJointCustody = 4;
    @observable minSumForLivingToThePayer = 4000;
    @observable sumForKidUnder6 = 1300;
    @observable percentageFromFatherInJointCustody = 40;

    //fitst table - parents data
    @observable childrenUnder6 = 0;
    @observable childrenOver6 = 0;
    @observable stayingMother = 0;
    @observable netSalaryMother = 0;
    @observable netSalaryFather = 0;
    @observable expensesMadorMother = 0;
    @observable expensesMadorFather = 0;
    @observable coordinatorParent = '';


  

    //second table
    @observable expensesChildrenOver6StayingRegardless = 0; //needs to be initialized to zero
    @observable expensesChildrenOver6DependingOnStaying = 0; //needs to be initialized to zero
    @observable unnecessaryExpensesChildrenUnder6 = 0; //needs to be initialized to zero
    @observable treatmentSumSoleCustody = 0;


   
    @computed get childrenMador() {
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

     //fitst table - parents data

    @computed get stayingFather() {
        return 14 - this.stayingMother;
    }

    @computed get minMador() {
        return Math.min(this.expensesMadorMother, this.expensesMadorFather);
    }
    @computed get totalSalaryMotherPercentage() {
        let totalSalary = this.netSalaryMother + this.netSalaryFather;
        if (totalSalary === 0)
            return 0;
        else {
            let toReturn = Math.round(100* this.netSalaryMother * 100 / totalSalary)/100;
            return toReturn;
        }
    }
    @computed get totalSalaryFatherPercentage() {
        let totalSalary = this.netSalaryMother + this.netSalaryFather;
        if (totalSalary === 0)
            return 0;
        else {
            let toReturn = Math.round(100* this.netSalaryFather * 100 / totalSalary) / 100;
            return toReturn;
        }
    }

    @computed get stayingPercentageMother() {
        let stayingPercentageMother = 0;
        stayingPercentageMother = this.calculatedDaysInYearMother / this.numOfDaysInAYear * 100;
        return stayingPercentageMother;
    }

    @computed get stayingPercentageFather() {
        let stayingPercentageFather = 0;
        stayingPercentageFather = this.calculatedDaysInYearFather / this.numOfDaysInAYear * 100;
        return stayingPercentageFather;
    }

    @computed get calculatedStayingPerFortnightMother() {
        if (this.stayingMother > (13 - this.minNightsSoThatItIsNotSelfCustody)) {
            return 14;
        }
        else {
            if (this.stayingMother < (1 + this.minNightsSoThatItIsNotSelfCustody)) {
                return 0;
            }
            else {
                return this.stayingMother;
            }
        }
    }

    @computed get calculatedStayingPerFortnightFather() {
        return 14 - this.calculatedStayingPerFortnightMother;
    }

    @computed get calculatedDaysInYearMother() {
        let calculatedDaysInYearMother;
        let calculatedStayingPerFortnightMother = this.calculatedStayingPerFortnightMother;
        calculatedDaysInYearMother = calculatedStayingPerFortnightMother / 14 * this.numOfDaysInAYear;
        return calculatedDaysInYearMother;
    }

    @computed get calculatedDaysInYearFather() {
        let calculatedDaysInYearFather;
        let calculatedStayingPerFortnightFather = this.calculatedStayingPerFortnightFather;
        calculatedDaysInYearFather = calculatedStayingPerFortnightFather / 14 * this.numOfDaysInAYear;
        return calculatedDaysInYearFather;
    }
//I think hese calcshifman are unneccesary
    @computed get calcShifmanMother() {
        let calcShifmanMother;
        calcShifmanMother = this.totalSalaryMotherPercentage - this.stayingPercentageMother;
        return calcShifmanMother;
    }

    @computed get calcShifmanFather() {
        let calcShifmanFather;
        calcShifmanFather = this.totalSalaryFatherPercentage - this.stayingPercentageFather;
        return calcShifmanFather;
    }
//until here

    //things to calculate and not show

    @computed get calcCustodyKind() {
        if (Math.abs(this.stayingMother - this.stayingFather) < this.maxNightDiffForJointCustody) {
            return 0;
        }
        else {
            //first parent
            if (this.stayingMother > this.stayingFather) {
                return 1;
            }
            //second parent
            else
                return 2;
        }
    }
    @computed get calcCoordinatorParent() {
        if (this.calcCustodyKind > 0) {
            return this.calcCustodyKind;
        }
        else {
            if (this.coordinatorParent === "father") {
                return 2;
            }
            else {
                return 1;
            }
        }


    }


    //second table
    @computed get expensesChildrenOver6StayingRegardlessMother() {
        return this.expensesChildrenOver6StayingRegardless * this.totalSalaryMotherPercentage / 100;
    }
    @computed get expensesChildrenOver6StayingRegardlessFather() {
        return this.expensesChildrenOver6StayingRegardless * this.totalSalaryFatherPercentage / 100;
    }

    @computed get unnecessaryExpensesChildrenUnder6Mother() {
        return this.unnecessaryExpensesChildrenUnder6 * this.totalSalaryMotherPercentage / 100;
    }
    @computed get unnecessaryExpensesChildrenUnder6Father() {
        return this.unnecessaryExpensesChildrenUnder6 * this.totalSalaryFatherPercentage / 100;
    }

    @computed get treatmentSumSoleCustodyMother() {
        if (this.calcCustodyKind === 2) {
            return this.treatmentSumSoleCustody;
        } else 
            return 0; 
    }
    @computed get treatmentSumSoleCustodyFather() {
        if (this.calcCustodyKind === 1) {
            return this.treatmentSumSoleCustody;
        } else 
             return 0;
    }
    @computed get nessesaryChildUnder6Needs() {
        return this.sumForKidUnder6 * this.childrenUnder6;

    }
    @computed get fatherNeedsToPayForKidsUnder6() {
        if (this.calcCustodyKind === 0)
            return (1 - this.percentageFromFatherInJointCustody/100)  * this.nessesaryChildUnder6Needs;
        else
            return this.nessesaryChildUnder6Needs;
    }
    @computed get motherMadorUnder6() {
        if (this.childrenUnder6 !== 0 || this.childrenOver6 != 0)
            return (this.childrenMador / 100) * this.childrenUnder6 / (this.childrenUnder6 + this.childrenOver6) * this.expensesMadorMother;
    }

    @computed get motherMadorUnder6FatherPays() {
        if (this.calcCustodyKind == 0)
            return 0.5 * this.motherMadorUnder6;
        else
            if (this.calcCustodyKind == 1)
                return this.motherMadorUnder6;
            else
                return 0;
    }
    @computed get expensesChildrenOver6DependingOnStayingForMother() {
        return Math.max(0, this.expensesChildrenOver6DependingOnStaying * (this.totalSalaryMotherPercentage - this.stayingPercentageMother)/100);
    }
    @computed get expensesChildrenOver6DependingOnStayingForFather() {
        return Math.max(0, this.expensesChildrenOver6DependingOnStaying * (this.totalSalaryFatherPercentage - this.stayingPercentageFather)/100);
    }

    @computed get madorOver6 () {
        let a = 0 ,b = 0;
        if (this.childrenUnder6 + this.childrenOver6 !== 0) {
            a = this.childrenMador/100*this.childrenOver6/(this.childrenOver6 + this.childrenUnder6);}
        if (this.calcCustodyKind === 0) {b = this.minMador}
        else {
            if (this.calcCustodyKind === 1) {b = this.expensesMadorMother}
            else {b = this.expensesMadorFather}
        }
        return a*b;
    }
    @computed get madorOver6Mother() {
        let a=0;
        if (this.calcCustodyKind === 0){
            a = 2*this.madorOver6 * this.totalSalaryMotherPercentage/100 - this.madorOver6;
        } else {
            a = this.madorOver6 * this.totalSalaryMotherPercentage/100;
        }
        return Math.max(a,0);
    }
    @computed get madorOver6Father() {
        let a=0;
        if (this.calcCustodyKind === 0){
            a = 2*this.madorOver6 * this.totalSalaryFatherPercentage/100 - this.madorOver6;
        } else {
            a = this.madorOver6 * this.totalSalaryFatherPercentage/100;
        }
        return Math.max(a,0);
    }
   




    //after the first yellow

    @computed get ifFatherIsCoordinatorThenMotherNeedsToPay() {
        let sum = 0;
        if (this.calcCoordinatorParent === 2) {
            sum = (this.expensesChildrenOver6StayingRegardlessFather
                + this.unnecessaryExpensesChildrenUnder6Father
                + this.treatmentSumSoleCustodyFather);
        } else { sum = 0 };
        return sum;
    }
    @computed get ifMotherIsCoordinatorThenFatherNeedsToPay() {
        let sum = 0;
        if (this.calcCoordinatorParent === 1) {
            sum = (this.expensesChildrenOver6StayingRegardlessMother
                + this.unnecessaryExpensesChildrenUnder6Mother
                + this.treatmentSumSoleCustodyMother);
        } else { sum = 0 };
        return sum;
    }

    @computed get fatherAlwaysPays() {
        return this.fatherNeedsToPayForKidsUnder6 + this.motherMadorUnder6FatherPays;
    }

    @computed get accordingToRelativeCalculationShifmanMother() {
        return this.expensesChildrenOver6DependingOnStayingForMother + this.madorOver6Mother;
    }
    @computed get accordingToRelativeCalculationShifmanFather() {
        return this.expensesChildrenOver6DependingOnStayingForFather + this.madorOver6Father;
    }
    @computed get totalSumMother() {
        let sum = this.ifFatherIsCoordinatorThenMotherNeedsToPay
                  + this.accordingToRelativeCalculationShifmanMother;
        return sum;
    }
    @computed get totalSumFather() {
        let sum = this.ifMotherIsCoordinatorThenFatherNeedsToPay
                    + this.fatherAlwaysPays
                    + this.accordingToRelativeCalculationShifmanFather;
        return sum;
    }

    //summary
    @computed get differencesFather() {
        if (this.totalSumFather > this.totalSumMother){
            return this.totalSumFather - this.totalSumMother;
        } else {
            return 0;
        }
    } 
    @computed get differencesMother() {
        if (this.totalSumMother > this.totalSumFather){
            return this.totalSumMother - this.totalSumFather ;
        } else {
            return 0;
        }
    } 

    @computed get maxRegardingMinSalaryFather() {
        return Math.max((this.netSalaryFather - this.minSumForLivingToThePayer),0);
    }
    @computed get maxRegardingMinSalaryMother() {
        return Math.max((this.netSalaryMother - this.minSumForLivingToThePayer),0);
    }

    
    @computed get toPayFather() {
        let a = Math.min(this.differencesFather, this.maxRegardingMinSalaryFather);
        let b = Math.round(100*a)/100;
        return Math.max(b,0);
    }
    @computed get toPayMother() {
        let a = Math.min(this.differencesMother, this.maxRegardingMinSalaryMother);
        let b = Math.round(100*a)/100;
        return Math.max(b,0);
    }

  


   
   


}
export default new Parameters;