import React from "react";
import styles from "./CSS/StatusInventoryView.module.css";
import { Droppable } from "react-beautiful-dnd";
import StatusIcon from "./StatusIcon";
import Status from "./Status";

class StatusInventoryView extends React.Component {
    constructor(props){
        super(props)
        this.state={
            statuses: []
        }

        // Load statuses from the StatusManager
        this.props.statusManager.StatusTemplates.forEach(i => {
            this.state.statuses.push(i);
        })
    }

    renderStatusIcons(){
        let toRender = [];

        toRender.push();
    }

    render(){
        return(
            <Droppable droppableId="statusInventory" direction="horizontal">
                {(provided) => (
                    <ul className={styles.StatusInventory} {...provided.droppableProps} ref={provided.innerRef}>
                        {this.state.statuses.map((i, index) => {
                            return <StatusIcon small={true} status={i} key={i.id+""} draggableId={i.id+""} index={index}/>    
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        );
    }
}

export default StatusInventoryView;