import React from "react";
import styles from "./CSS/TimelineCard.module.css";
import StatusIcon from "./StatusIcon";
import { Droppable } from "react-beautiful-dnd";
import Status from "./Status";

class TimelineCard extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newInitiative = 0;
        if (event.target.value === ""){newInitiative = null;}
        else {newInitiative = event.target.value};
        this.props.onInitiativeChange(newInitiative, this.props.member.index)
    }

    onStatusClicked = (statusId, windowPos) => {
        this.props.onStatusClicked(statusId, this.props.member.index, windowPos)
    }

    render(){
        let cardContainerStyle = this.props.myTurn ? styles.TimelineCardContainerActive : styles.TimelineCardContainer;
        
        let startStatusesID = "start_TL_Statuses" + this.props.member.index;
        let generalStatusesID = "general_TL_Statuses" + this.props.member.index;
        let endStatusesID = "end_TL_Statuses" + this.props.member.index;

        return(
            <div className={cardContainerStyle}>
                <div className={styles.TimelineTitle}>
                    <p className={styles.InitiativeBox}>{this.props.member.initiative   }</p>
                    <p className={styles.Name}>{this.props.member.name}</p>
                </div>
                <div className={styles.TimelineContent}>
                    <Droppable droppableId={startStatusesID} direction="horizontal">
                        {(provided) => (
                        <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.member.statuses[0].map((i, index) => {
                                let id = i.status.id + ("_" + this.props.member.index) + index
                                let displayStatus = new Status(i.status.id, i.status.name, i.status.desc, i.status.icon, true);
                                let displayTimer = (i.timeout !== "") ? i.timeout*1-this.props.iteration : -1;
                                if (i.timeout !== "" && displayTimer < 1) {return null}
                                else {
                                    return <StatusIcon timer={displayTimer} onStatusClicked={this.onStatusClicked} small={true} status={displayStatus} key={id} draggableId={id} index={index}/>
                                }
                            })}
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable>
                    <Droppable droppableId={generalStatusesID} direction="horizontal">
                        {(provided) => (
                        <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.member.statuses[1].map((i, index) => {
                                let id = i.status.id + ("_" + this.props.member.index) + index
                                let displayStatus = new Status(i.status.id, i.status.name, i.status.desc, i.status.icon, true);
                                let displayTimer = (i.timeout !== "") ? i.timeout*1-this.props.iteration : -1;
                                if (i.timeout !== "" && displayTimer < 1) {return null}
                                else {
                                    return <StatusIcon timer={displayTimer} onStatusClicked={this.onStatusClicked} small={true} status={displayStatus} key={id} draggableId={id} index={index}/>
                                }
                            })} 
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable><Droppable droppableId={endStatusesID} direction="horizontal">
                        {(provided) => (
                        <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.member.statuses[2].map((i, index) => {
                                let id = i.status.id + ("_" + this.props.member.index) + index
                                let displayStatus = new Status(i.status.id, i.status.name, i.status.desc, i.status.icon, true);
                                let displayTimer = (i.timeout !== "") ? i.timeout*1-this.props.iteration : -1;
                                if (i.timeout !== "" && displayTimer < 1) {return null}
                                else {
                                    return <StatusIcon timer={displayTimer} onStatusClicked={this.onStatusClicked} small={true} status={displayStatus} key={id} draggableId={id} index={index}/>
                                }
                            })}
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable>
                </div>
            </div>
        );
    }
}

export default TimelineCard;