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
        
        this.state.statuses.push(this.props.statusManager.createStatus(0));
        this.state.statuses.push(this.props.statusManager.createStatus(1));
        this.state.statuses.push(this.props.statusManager.createStatus(2));
        this.state.statuses.push(this.props.statusManager.createStatus(3));
    }

    renderStatusIcons(){
        let toRender = [];

        toRender.push();
    }

    render(){
        return(
            <Droppable droppableId="statusInventory">
                {(provided) => (
                    <ul className={styles.StatusInventory} {...provided.droppableProps} ref={provided.innerRef}>
                        {this.state.statuses.map((i, index) => {
                            return <StatusIcon status={i} key={i.id+""} draggableId={i.id+""} index={index}/>    
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        );
    }
}

export default StatusInventoryView;