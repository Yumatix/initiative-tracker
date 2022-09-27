import React from "react"
import styles from "./CSS/MemberCard.module.css"

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

    render(){
        let valueToRender = (this.props.member.initiative === null) ? "" : this.props.member.initiative;

        return(
            <div className={styles.MemberCardContainer}>
                <div className={styles.Title}>
                    <p className={styles.Name}>{this.props.member.name}</p>
                    <input className={styles.InitiativeField} type="number" value={valueToRender} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default MemberCard;