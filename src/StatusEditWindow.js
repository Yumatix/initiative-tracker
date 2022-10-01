import React from "react";
import styles from "./CSS/StatusEditWindow.module.css";
import Status from "./Status";

class StatusEditWindow extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            statusData: this.props.statusData,
            immutable: false
        }

        // Store this separately so we have separate control over whether this value changes
        if (this.props.statusData != null && Object.hasOwn(this.props.statusData, 'status')){
            this.state.immutable = this.props.statusData.status.immutable
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

    getSafeWindowPos = (windowPos) => {
        // TODO : promote sizes to variables, rather than hard-coding

        let editWindowWidth = window.innerWidth * .3 + 16;

        // Confine this window to the browser window
        let maxX = window.innerWidth * .7 - 16;
        let maxY = window.innerHeight * .7 - 16;
        let safeX = Math.min(windowPos[0], maxX);
        let safeY = Math.min(windowPos[1], maxY);

        // Move left/right if covering the provided coordinates
        // Since the provided coordinates are actually a representation of the statusIcon that we clicked
        if (safeX < windowPos[0] && safeX+editWindowWidth > windowPos[0] + windowPos[2]) {
            safeX = windowPos[0] - editWindowWidth;
        }

        return [safeX, safeY];
    }

    render(){
        let showWindow = false;
        if (this.props.statusData != null && Object.hasOwn(this.props.statusData, 'status')){
            showWindow = true;
        }

        if (showWindow) {

            // Position window
            let targetPos = this.props.windowPos;
            if (!Array.isArray(targetPos) || targetPos.length !== 4) {targetPos = [0,0,0,0]}
            targetPos = this.getSafeWindowPos(targetPos);
            let targetX = targetPos[0];
            let targetY = targetPos[1];
            
            return(
                <div 
                    style={{
                        position: "absolute",
                        top: targetY, 
                        left: targetX,
                        width: "30vw",
                        height: "30vh",
                        background: "white",
                        margin: 0,
                        padding: 0,
                        border: "4px solid black",
                        borderRadius: "8pt"
                }}>
                    <div className={styles.TitleBar}>
                        <img src={this.state.statusData.status.icon} className={styles.Icon}/>
                        <div className={styles.TitleWrapper}>
                            <input disabled={this.state.immutable} onChange={this.handleNameChange} type="text" className={styles.Title} value={this.state.statusData.status.name}/>
                            <div className={styles.TimerWrapper}>
                                <label htmlFor="timerField" className={styles.TimerLabel}>Timer: </label>
                                <input disabled={this.state.immutable} onChange={this.handleTimerChange} id="timerField" type="number" className={styles.TimerField} value={this.state.statusData.timeout}/>
                            </div>
                        </div>
                        <div className={styles.CloseButtonWrapper}>
                            <button onClick={this.props.clearTargetStatus} className={styles.CloseButton}>X</button>
                        </div>   
                    </div>
                    <div className={styles.ContentWrapper}>
                        <textarea disabled={this.state.immutable} onChange={this.handleDescChange} className={styles.Description} value={this.state.statusData.status.desc}/>
                    </div>
                </div>
            );
        } else {
            return;
        }
        
    }
}

export default StatusEditWindow;