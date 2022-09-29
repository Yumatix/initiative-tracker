import React from "react";
import styles from "./CSS/StatusIcon.module.css";
import { Draggable } from "react-beautiful-dnd";

class StatusIcon extends React.Component {
    render() {
        let iconStyle = ((this.props.small == true) ? styles.SmallContainer : styles.Container);

        return(
            <Draggable key={this.props.key} draggableId={this.props.draggableId} index={this.props.index}>
                {(provided) => (
                    <li className={iconStyle} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <img src={this.props.status.icon}/>
                    </li>
                )}
            </Draggable>
        );
    }
}

export default StatusIcon;