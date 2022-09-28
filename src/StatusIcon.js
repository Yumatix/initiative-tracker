import React from "react";
import styles from "./CSS/StatusIcon.module.css";
import { Draggable } from "react-beautiful-dnd";

class StatusIcon extends React.Component {
    render() {
        return(
            <Draggable key={this.props.key} draggableId={this.props.draggableId} index={this.props.index}>
                {(provided) => (
                    <li className={styles.Container} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {this.props.status.id}
                    </li>
                )}
            </Draggable>
        );
    }
}

export default StatusIcon;