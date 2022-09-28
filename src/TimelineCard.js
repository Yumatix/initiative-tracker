import React from "react"
import styles from "./CSS/TimelineCard.module.css"

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

    render(){
        let cardContainerStyle = this.props.myTurn ? styles.TimelineCardContainerActive : styles.TimelineCardContainer;

        return(
            <div className={cardContainerStyle}>
                <div className={styles.TimelineTitle}>
                    <p className={styles.InitiativeBox}>{this.props.member.initiative   }</p>
                    <p className={styles.Name}>{this.props.member.name}</p>
                </div>
            </div>
        );
    }
}

export default TimelineCard;