import { observable, computed } from "mobx";

class Parameters {
    //permanent data    
    @observable numOfDaysInAYear = 365;
    @observable minNightsSoThatItIsNotSelfCustody = 2;
    @observable maxNightDiffForJointCustody = 4;
    @observable minSumForLivingToThePayer = 4000;
    @observable sumForKidUnder6 = 1300;
    @observable percentageFromFatherInJointCustody = 40;

 //for the button that saves permanent data  

    @observable tempNumOfDaysInAYear = 365;
    @observable tempMinNightsSoThatItIsNotSelfCustody = 2;
    @observable tempMaxNightDiffForJointCustody = 4;
    @observable tempMinSumForLivingToThePayer = 4000;
    @observable tempSumForKidUnder6 = 1300;
    @observable tempPercentageFromFatherInJointCustody = 40;


    //fitst table - parents data
    @observable childrenUnder6 = 0;
    @observable childrenOver6 = 0;
    @observable stayingMother;
    @observable netSalaryMother;
    @observable netSalaryFather;
    @observable expensesMadorMother;
    @observable expensesMadorFather;
    @observable coordinatorParent = '';

    //second table
    @observable tempExpensesChildrenOver6StayingRegardless;
    @observable tempExpensesChildrenOver6DependingOnStaying;
    @observable tempUnnecessaryExpensesChildrenUnder6;
    @observable tempTreatmentSumSoleCustody;


    
     

    @computed get expensesChildrenOver6StayingRegardless() {
        if (this.tempExpensesChildrenOver6StayingRegardless && (this.childrenOver6||0) > 0){
            return this.tempExpensesChildrenOver6StayingRegardless;
        } return 0;
    } 
    @computed get expensesChildrenOver6DependingOnStaying() {
        if (this.tempExpensesChildrenOver6DependingOnStaying && (this.childrenOver6||0) > 0){
            return this.tempExpensesChildrenOver6DependingOnStaying;
        } return 0;
    }
    @computed get unnecessaryExpensesChildrenUnder6() {
        if (this.tempUnnecessaryExpensesChildrenUnder6 && (this.childrenUnder6||0) > 0){
            return this.tempUnnecessaryExpensesChildrenUnder6;
        } return 0;
    }

    @computed get treatmentSumSoleCustody() {
        if (this.tempTreatmentSumSoleCustody){
            return this.tempTreatmentSumSoleCustody;
        } return 0;
    }



    @computed get numOfChildren() {
        return (this.childrenUnder6 || 0) + (this.childrenOver6 || 0);
    }

    @computed get childrenMador() {
        if (this.numOfChildren !== 0) {
            if (this.numOfChildren > 2) { return 55 }
            else {
                if (this.numOfChildren > 1) { return 40 }
                else {
                    if (this.numOfChildren === 1) {
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
        return 14 - (this.stayingMother || 0);
    }

    @computed get minMador() {
        return Math.min((this.expensesMadorMother || 0), (this.expensesMadorFather || 0));
    }
    @computed get totalSalaryMotherPercentage() {
        let totalSalary = (this.netSalaryMother || 0) + (this.netSalaryFather || 0);
        if (totalSalary === 0)
            return 0;
        else {
            let toReturn = Math.round(100 * (this.netSalaryMother || 0) * 100 / totalSalary) / 100;
            return toReturn;
        }
    }
    @computed get totalSalaryFatherPercentage() {
        let totalSalary = (this.netSalaryMother || 0) + (this.netSalaryFather || 0);
        if (totalSalary === 0)
            return 0;
        else {
            let toReturn = Math.round(100 * (this.netSalaryFather || 0) * 100 / totalSalary) / 100;
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
        if ((this.stayingMother || 0) > (13 - this.minNightsSoThatItIsNotSelfCustody)) {
            return 14;
        }
        else {
            if ((this.stayingMother || 0) < (1 + this.minNightsSoThatItIsNotSelfCustody)) {
                return 0;
            }
            else {
                return (this.stayingMother || 0);
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
    //I think these calcshifman are unneccesary
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
        if (Math.abs((this.stayingMother || 0) - (this.stayingFather || 0)) < this.maxNightDiffForJointCustody) {
            return 0;
        }
        else {
            //first parent
            if ((this.stayingMother || 0) > (this.stayingFather || 0)) {
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
        return (this.expensesChildrenOver6StayingRegardless || 0) * this.totalSalaryMotherPercentage / 100;
    }
    @computed get expensesChildrenOver6StayingRegardlessFather() {
        return (this.expensesChildrenOver6StayingRegardless || 0) * this.totalSalaryFatherPercentage / 100;
    }

    @computed get unnecessaryExpensesChildrenUnder6Mother() {
        return (this.unnecessaryExpensesChildrenUnder6 || 0) * this.totalSalaryMotherPercentage / 100;
    }
    @computed get unnecessaryExpensesChildrenUnder6Father() {
        return (this.unnecessaryExpensesChildrenUnder6 || 0) * this.totalSalaryFatherPercentage / 100;
    }

    @computed get treatmentSumSoleCustodyMother() {
        if (this.calcCustodyKind === 2) {
            return (this.treatmentSumSoleCustody || 0);
        } else
            return 0;
    }
    @computed get treatmentSumSoleCustodyFather() {
        if (this.calcCustodyKind === 1) {
            return (this.treatmentSumSoleCustody || 0);
        } else
            return 0;
    }
    @computed get nessesaryChildUnder6Needs() {
        return this.sumForKidUnder6 * (this.childrenUnder6 || 0);

    }
    @computed get fatherNeedsToPayForKidsUnder6() {
        if (this.calcCustodyKind === 0)
            return (1 - this.percentageFromFatherInJointCustody / 100) * this.nessesaryChildUnder6Needs;
        else
            return this.nessesaryChildUnder6Needs;
    }
    @computed get motherMadorUnder6() {
        if (this.numOfChildren !== 0)
            return (this.childrenMador / 100) * (this.childrenUnder6 || 0) / (this.numOfChildren) * (this.expensesMadorMother || 0);
    }

    @computed get motherMadorUnder6FatherPays() {
        if (this.calcCustodyKind === 0)
            return 0.5 * this.motherMadorUnder6;
        else
            if (this.calcCustodyKind === 1)
                return this.motherMadorUnder6;
            else
                return 0;
    }
    @computed get expensesChildrenOver6DependingOnStayingForMother() {
        return Math.max(0, (this.expensesChildrenOver6DependingOnStaying || 0) * (this.totalSalaryMotherPercentage - this.stayingPercentageMother) / 100);
    }
    @computed get expensesChildrenOver6DependingOnStayingForFather() {
        return Math.max(0, (this.expensesChildrenOver6DependingOnStaying || 0) * (this.totalSalaryFatherPercentage - this.stayingPercentageFather) / 100);
    }

    @computed get madorOver6() {
        let a = 0, b = 0;
        if (this.numOfChildren !== 0) {
            a = this.childrenMador / 100 * (this.childrenOver6 || 0) / (this.numOfChildren);
        }
        if (this.calcCustodyKind === 0) { b = this.minMador }
        else {
            if (this.calcCustodyKind === 1) { b = (this.expensesMadorMother || 0) }
            else { b = (this.expensesMadorFather || 0) }
        }
        return a * b;
    }

    @computed get madorOver6Mother() {
        let a = 0;
        if (this.calcCustodyKind === 0) {
            a = 2 * this.madorOver6 * this.totalSalaryMotherPercentage / 100 - this.madorOver6;
        } else {
            a = this.madorOver6 * this.totalSalaryMotherPercentage / 100;
        }
        return Math.max(a, 0);
    }
    @computed get madorOver6Father() {
        let a = 0;
        if (this.calcCustodyKind === 0) {
            a = 2 * this.madorOver6 * this.totalSalaryFatherPercentage / 100 - this.madorOver6;
        } else {
            a = this.madorOver6 * this.totalSalaryFatherPercentage / 100;
        }
        return Math.max(a, 0);
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
        if (this.totalSumFather > this.totalSumMother) {
            return this.totalSumFather - this.totalSumMother;
        } else {
            return 0;
        }
    }
    @computed get differencesMother() {
        if (this.totalSumMother > this.totalSumFather) {
            return this.totalSumMother - this.totalSumFather;
        } else {
            return 0;
        }
    }

    @computed get maxRegardingMinSalaryFather() {
        return Math.max(((this.netSalaryFather || 0) - this.minSumForLivingToThePayer), 0);
    }
    @computed get maxRegardingMinSalaryMother() {
        return Math.max(((this.netSalaryMother || 0) - this.minSumForLivingToThePayer), 0);
    }


    @computed get toPayFather() {
        let a = Math.min(this.differencesFather, this.maxRegardingMinSalaryFather);
        let b = Math.round(100 * a) / 100;
        return Math.max(b, 0);
    }
    @computed get toPayMother() {
        let a = Math.min(this.differencesMother, this.maxRegardingMinSalaryMother);
        let b = Math.round(100 * a) / 100;
        return Math.max(b, 0);
    }


   


}
export default new Parameters;