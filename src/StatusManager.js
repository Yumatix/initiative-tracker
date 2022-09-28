// Class designed to load and store different status effect templates
// As well as helping to easily create new statuses from those templates

import Status from "./Status";

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

    createStatus(templateId) { 
        return new Status(
            this.StatusTemplates[templateId].id
        );
    }
}

export default StatusManager