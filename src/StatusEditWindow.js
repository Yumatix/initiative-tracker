import React from "react";
import styles from "./CSS/StatusEditWindow.module.css";
import Status from "./Status";

class StatusEditWindow extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            statusData: this.props.statusData
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    handleNameChange = (e) => {
        let newStatusData = this.state.statusData;
        newStatusData.status.name = e.target.value;
        this.setState({statusData : newStatusData});
    }

    handleDescChange = (e) => {
        let newStatusData = this.state.statusData;
        newStatusData.status.desc = e.target.value;
        this.setState({statusData : newStatusData});
    }

    handleTimerChange = (e) => {
        let newStatusData = this.state.statusData;
        newStatusData.timeout = e.target.value;
        this.setState({statusData : newStatusData});
        this.props.manualUpdate();
    }

    render(){
        let showWindow = false;
        if (this.props.statusData != null && Object.hasOwn(this.props.statusData, 'status')){
            showWindow = true;
        }

        if (showWindow) {
            return(
                <div className={styles.WindowContainer}>
                    <div className={styles.TitleBar}>
                        <img src={this.state.statusData.status.icon} className={styles.Icon}/>
                        <div className={styles.TitleWrapper}>
                            <input onChange={this.handleNameChange} type="text" className={styles.Title} value={this.state.statusData.status.name}/>
                            <div className={styles.TimerWrapper}>
                                <label htmlFor="timerField" className={styles.TimerLabel}>Timer: </label>
                                <input onChange={this.handleTimerChange} id="timerField" type="number" className={styles.TimerField} value={this.state.statusData.timeout}/>
                            </div>
                        </div>
                        <div className={styles.CloseButtonWrapper}>
                            <button onClick={this.props.clearTargetStatus} className={styles.CloseButton}>X</button>
                        </div>   
                    </div>
                    <div className={styles.ContentWrapper}>
                        <textarea onChange={this.handleDescChange} className={styles.Description} value={this.state.statusData.status.desc}/>
                    </div>
                </div>
            );
        } else {
            return;
        }
        
    }
}

export default StatusEditWindow;