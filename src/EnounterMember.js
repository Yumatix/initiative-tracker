class EncounterMember{
    constructor(memberIndex, name, initiative){
        this.index = memberIndex;
        this.name = name || "";
        this.initiative = initiative || null;
        this.statuses = [[], [], []];
    };

    addStatus = (status, listId, timeout) => {
        if ([0,1,2].includes(listId)){
            this.statuses[listId].push({
                "status" : status,
                "timeout" : timeout
            });
            return [status.id, this.index];
        } else {
            console.log("Invalid ID: " + listId)
        }
        
    }

    getStatusById = (statusId) => {
        for (let i = 0; i < this.statuses.length; i++){
            for (let j = 0; j < this.statuses[i].length; j++){
                if(this.statuses[i][j].status.id == statusId){
                    return this.statuses[i][j];
                }
            }
        }
    }

    onTurnEnd = () => {
        let toRemoveIds = [];
        // Tick down statuses with timouts
        for (let i = 0; i < this.statuses.length; i++){
            for (let j = 0; j < this.statuses[i].length; j++){
                if (this.statuses[i][j].timeout*1 > 0){
                    this.statuses[i][j].timeout--;

                    // If new timeout is zero, mark it for deletion
                    if (this.statuses[i][j].timeout === 0){
                        toRemoveIds.push(this.statuses[i][j].status.id);
                    }
                } 
            }
        }

        // Remove statuses that have a timeout value of zero
        this.removeStatuses(toRemoveIds);
    }

    removeStatuses = (statusIdArray) => {

        if (!Array.isArray(statusIdArray)){
            console.warn("EncounterMember.removeStatuses() was passed a non-array as a function!")
            return;
        }

        let newStatuses = [[],[],[]];
        for (let i = 0; i < this.statuses.length; i++){
            this.statuses[i].forEach(e => {
                if (!(statusIdArray.includes(e.status.id))){
                    newStatuses[i].push(e);
                }
            })
        }
        this.statuses = newStatuses;
    }
}


export default EncounterMember;