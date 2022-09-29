// Class designed to load and store different status effect templates
// As well as helping to easily create new statuses from those templates

import Status from "./Status";
import defaultStatusesJSON from "./defaultStatuses.json";

class StatusManager {
    constructor(){
        this.StatusTemplates = [];
    }


    // Function to load up some random, testing statuses. 
    loadTestStatuses() {
        this.StatusTemplates.push(new Status(0));
        this.StatusTemplates.push(new Status(1));
        this.StatusTemplates.push(new Status(2));
        this.StatusTemplates.push(new Status(3));
    }

    loadDefaultStatuses = (iconDirectory) => {
        defaultStatusesJSON.forEach(i => {
            let iconPath = "";
            iconPath = iconDirectory + i.icon;
            console.log("Loading icon:  " + iconPath);
            this.StatusTemplates.push(new Status(i.id, i.name, i.desc, iconPath));
        });
    }

    createStatus(templateId, unique) { 
        
        let uniqueId = "";
        if (unique){
            let now = new Date();
            uniqueId += "-" + now.getTime();
        }

        return new Status(
            this.StatusTemplates[templateId].id+uniqueId,
            this.StatusTemplates[templateId].name,
            this.StatusTemplates[templateId].desc,
            this.StatusTemplates[templateId].icon
        );
    }
}

export default StatusManager