class EncounterMember{
    constructor(memberIndex, name, initiative, statusesStart, statusesEnd, statusesGeneral){
        this.index = memberIndex
        this.name = name;
        this.initiative = initiative;
        this.statusesStart = statusesStart;
        this.statusesEnd = statusesEnd;
        this.statusesGeneral = statusesGeneral;
    };
}


export default EncounterMember;