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
        // Tick down statuses with timouts
        for (let i = 0; i < this.statuses.length; i++){
            for (let j = 0; j < this.statuses[i].length; j++){
                if (this.statuses[i][j].timeout*1 > 0){
                    this.statuses[i][j].timeout--;
                } 
            }
        }

        // Remove statuses that have a timeout value of zero
        let newStatuses = [[],[],[]];
        for (let i = 0; i < this.statuses.length; i++){
            this.statuses[i].forEach(e => {
                if (e.timeout !== 0){
                    newStatuses[i].push(e);
                }
            })
        }
        this.statuses = newStatuses;
    }

    removeStatus = (statusId, listId) => {
        if ([0,1,2].includes(listId)){
            let removeIndex = -1;
            for (let i = 0; i < this.statuses[listId].length; i++){
                if(this.statuses[listId][i].status.id === statusId){removeIndex=i; break;}
            }
            this.statuses[listId].splice(removeIndex, 1);
        } else {
            console.log("Invalid ID: " + listId)
        }
    }
}


export default EncounterMember;