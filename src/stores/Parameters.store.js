import { observable , computed } from "mobx";

class Parameters {
    @observable childrenUnder6 = 0;
    @observable childrenOver6 = 0;
    @observable stayingFirstParent =0;
    @observable netSalaryFirstParent =0;
    @observable netSalarySecondParent =0;
    @observable expensMadorOne = 0;
    @observable expensMadorTwo = 0;

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
    



    
}

export default new Parameters;