import React from "react";
import styles from "./CSS/NewMemberWindow.module.css"

class NewMemberWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            initiative: ""
        };

        this.handleInitiativeChange = this.handleInitiativeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleInitiativeChange = (event) => {
        let newInitiative = ((event.target.value === "") ? null : event.target.value);
        this.setState({initiative: newInitiative});
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    addNewMember = () => {
        this.props.onAddMember(this.state.name, this.state.initiative);
        this.closeWindow();
    }

    closeWindow = () => {
        this.props.setWindowVisible(false);
    }

    render() {
        return(
            <div className={styles.NewMemberWindowWrapper}>
                <div className={styles.NewMemberWindowContainer}>
                    <div className={styles.TopBar}>
                        <input type="text" className={styles.NameField} onChange={this.handleNameChange}/>
                        <div style={{height: "100%"}}>
                            <label for="initiative">Initiative:</label>
                            <input id="initiative" type="number" className={styles.InitiativeField} onChange={this.handleInitiativeChange}/>
                            <button className={styles.AddButton} onClick={this.addNewMember}>Add</button>
                        </div>
                    </div>
                </div>
                <button className={styles.Close} onClick={this.closeWindow}>X</button>
            </div>
        );
    }
}

export default NewMemberWindow;