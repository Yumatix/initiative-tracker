import React from "react"
import styles from "./CSS/MemberCard.module.css"
import StatusIcon from "./StatusIcon";
import { Droppable } from "react-beautiful-dnd";

class MemberCard extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newInitiative = 0;
        if (event.target.value === ""){newInitiative = null;}
        else {newInitiative = event.target.value};
        this.props.onInitiativeChange(newInitiative, this.props.member.index)
    }

    confirmDeleteCharacter = () => {
        let confirmation = window.confirm("Do you want to delete " + this.props.member.name + "?");
        if (confirmation) {
            this.props.onDeleteMember(this.props.member.index);
        }
    }

    onStatusClicked = (statusId, windowPos) => {
        this.props.onStatusClicked(statusId, this.props.member.index, windowPos);
    }

    render(){
        let valueToRender = (this.props.member.initiative === null) ? "" : this.props.member.initiative;

        let startStatusesID = "startStatuses" + this.props.member.index;
        let generalStatusesID = "generalStatuses" + this.props.member.index;
        let endStatusesID = "endStatuses" + this.props.member.index;

        return(
            <div className={styles.MemberCardContainer}>
                <div className={styles.Title}>
                    <input className={styles.InitiativeField} type="number" value={valueToRender} onChange={this.handleChange}/>
                    <p className={styles.Name}>{this.props.member.name}</p>
                    <button className={styles.DeleteButton} onClick={this.confirmDeleteCharacter}>X</button>
                </div>
                <div className={styles.Statuses}>
                    <div className={styles.StatusArea}>
                        <Droppable droppableId={startStatusesID} direction="horizontal">
                            {(provided) => (
                                <div className={styles.StatusListContainer}>
                                    <p className={styles.StatusListTitle}>Turn Start</p>
                                    <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.member.statuses[0].map((i, index) => {
                                            let id = i.status.id + ("_" + this.props.member.index) + index
                                            return <StatusIcon timer={this.props.member.statuses[0][index].timeout} onStatusClicked={this.onStatusClicked} small={true} status={i.status} key={id} draggableId={id} index={index}/>
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId={generalStatusesID} direction="horizontal">
                            {(provided) => (
                                <div className={styles.StatusListContainer}>
                                    <p className={styles.StatusListTitle}>General</p>
                                    <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.member.statuses[1].map((i, index) => {
                                            let id = i.status.id + ("_" + this.props.member.index) + index
                                            return <StatusIcon timer={this.props.member.statuses[1][index].timeout} onStatusClicked={this.onStatusClicked} small={true} status={i.status} key={id} draggableId={id} index={index}/>
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                </div>
                                
                            )}
                        </Droppable>
                        <Droppable droppableId={endStatusesID} direction="horizontal">
                            {(provided) => (
                                <div className={styles.StatusListContainer}>
                                    <p className={styles.StatusListTitle}>Turn End</p>
                                    <ul className={styles.StatusList} {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.member.statuses[2].map((i, index) => {
                                            let id = i.status.id + ("_" + this.props.member.index) + index
                                            return <StatusIcon timer={this.props.member.statuses[2][index].timeout} onStatusClicked={this.onStatusClicked} small={true} status={i.status} key={id} draggableId={id} index={index}/>
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
        );
    }
}

export default MemberCard;