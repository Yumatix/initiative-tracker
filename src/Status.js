class Status {
    constructor(id, name, desc, icon){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.icon = icon;
    }

    setName = (newName) => {
        this.name = newName;
    }

    setDesc = (newDesc) => {
        this.desc = newDesc;
    }

    setIconPath = (newIconPath) => {
        this.icon = newIconPath;
    }
}

export default Status;