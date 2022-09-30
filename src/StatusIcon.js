import React from "react";
import styles from "./CSS/StatusIcon.module.css";
import { Draggable } from "react-beautiful-dnd";

class StatusIcon extends React.Component {
    handleClick = () => {
        this.props.onStatusClicked(this.props.status.id);
    }

    renderTimer = () => {
        if (this.props.timer != null && this.props.timer*1 > 0) {
            return (
                <div className={styles.TimerWrapper}>
                    <p className={styles.Timer}>{this.props.timer}</p>
                </div>
            )
        }
    }

    render() {
        let iconStyle = ((this.props.small == true) ? styles.SmallContainer : styles.Container);

        return(
            <Draggable key={this.props.key} draggableId={this.props.draggableId} index={this.props.index}>
                {(provided) => (
                    <li className={iconStyle} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <img src={this.props.status.icon} onClick={this.handleClick}/>
                        {this.renderTimer()}
                    </li>
                )}
            </Draggable>
        );
    }
}

export default StatusIcon;