class Status {
    constructor(id, name, desc, icon, immutable){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.icon = icon;
        this.immutable = immutable
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