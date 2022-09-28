class EncounterMember{
    constructor(memberIndex, name, initiative){
        this.index = memberIndex;
        this.name = name || "";
        this.initiative = initiative || null;
        this.statuses = [[], [], []];
    };

    addStatus = (status, listId) => {
        if ([0,1,2].includes(listId)){
            this.statuses[listId].push(status);
        } else {
            console.log("Invalid ID: " + listId)
        }
        
    }

    removeStatus = (statusId, listId) => {
        if ([0,1,2].includes(listId)){
            let removeIndex = -1;
            for (let i = 0; i < this.statuses[listId].length; i++){
                if(this.statuses[listId][i].id === statusId){removeIndex=i; break;}
            }
            this.statuses[listId].splice(removeIndex, 1);
        } else {
            console.log("Invalid ID: " + listId)
        }
    }
}


export default EncounterMember;