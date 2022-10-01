import React from "react"
import styles from "./CSS/MemberListView.module.css"
import MemberCard from './MemberCard.js';

class MemberListView extends React.Component {
    render(){
        return(
            <div className={styles.MemberListContainer}>
                <div className={styles.CardContainer}>
                    {this.renderMemberList(this.props.memberList)}
                </div>
            </div>
        );
    }

    handleInitiativeChange = (newInitiative, memberIndex) => {
        this.props.onInitiativeChange(newInitiative, memberIndex);
    }

    onStatusClicked = (statusId, memberIndex, windowPos) => {
        this.props.onStatusClicked(statusId, memberIndex, windowPos);
    }

    renderMemberList = list => {
        return list.map(i => {
           return <MemberCard member={i} onStatusClicked={this.onStatusClicked} onInitiativeChange={this.handleInitiativeChange} onDeleteMember={this.props.onDeleteMember}/>
        })
    }

}

export default MemberListView;