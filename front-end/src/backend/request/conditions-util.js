export default class{
    constructor(){
        this.queryParamCondition = "";
    }

    static getConditionQueryParam(conditions){
        let param = "";
        if(!conditions){
            return {};
        }

        conditions.forEach(function(element, index, array){
            param += " " + element + (array.length-1!=index ? ",":"");
        });
        return { condition: param };
    }

}
