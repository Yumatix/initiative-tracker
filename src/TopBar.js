import React from "react";
import styles from "./CSS/TopBar.module.css";

class TopBar extends React.Component {

    showNewMemberWindow = () => {
        this.props.setNewMemberWindowVisible(true);
    }

    render() {
        return (
            <div className={styles.TopBarContainer}>
                <div className={styles.EncounterMemberToolbar}>
                    <button type="button" onClick={this.props.onClearInitiative} className={styles.ClearInitiativeButton}>
                        Clr Init
                    </button>
                    <button type="button" className={styles.NewMemberButton} onClick={this.showNewMemberWindow}>
                        +
                    </button>
                </div>
            </div>


        );
    }




}

export default TopBar;