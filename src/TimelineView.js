import React from "react"
import TimelineCard from "./TimelineCard"
import styles from "./CSS/TimelineView.module.css"

class TimelineView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            iterations: 1,
            initiativeOrder: [],
            currentRound: [],
            gameActive: false,
            autoRound: false
        };
        this.handleIterationsChange = this.handleIterationsChange.bind(this);
    }



    render(){
        let autoRoundBtnClass = (this.state.autoRound) ? styles.AutoRoundActiveButton : styles.AutoRoundInactiveButton;
        let activeBtnClass = (this.state.gameActive) ? styles.GameActiveButton : styles.GameInactiveButton;

        return(
            <div className={styles.TimelineViewContainer}>
                <div className={styles.TimelineToolbar}>
                    <button type="button" onClick={this.toggleAutoRound} className={autoRoundBtnClass}>
                        Next Round Auto
                    </button>
                    <button type="button" onClick={this.toggleActive} className={activeBtnClass}>
                        Start
                    </button>
                    <div className={styles.IterationsContainer}>
                        <input className={styles.IterationsField} type="number" value={this.state.iterations} onChange={this.handleIterationsChange}/>
                    </div>
                </div>

                <div className={styles.TimelineMain}>
                    <div className={styles.CurrentRoundContainer}>
                        {this.renderCurrentRound()}
                    </div>
                    <div className={styles.InitiativeOrderContainer}>
                        {this.renderInitiativeOrder(this.props.memberList)}
                    </div>
                </div>
                
                <div className={styles.TimelineCurrent}>
                    <div className={styles.CurrentTurnContainer}>

                    </div>
                    <button type="button" onClick={this.nextTurn} className={styles.NextTurnButton}>
                        Next Turn
                    </button>
                </div>

            </div>
            
        )
    }


    handleIterationsChange(event){
        this.setState({iterations: event.target.value});
    }



    handleInitiativeChange = (newInitiative, memberIndex) => {
        this.props.onInitiativeChange(newInitiative, memberIndex);
    }


    renderCurrentRound() {
        let toRender = [];
        let myTurnMarked = false;

        // Auto generate new round when current round ends        
        if (this.state.autoRound){
            if (this.state.currentRound.length <= 0 && this.state.gameActive === true) {
                let newRound = this.generateRound();
                this.setState({currentRound : newRound});
            }
        }
        

        if(this.state.currentRound.length > 0){
            toRender.push(this.state.currentRound.map(i => {
                if (!myTurnMarked) {
                    myTurnMarked = true;
                    return <TimelineCard member={i} myTurn={true}/>
                } 
                else {
                    return <TimelineCard member={i} myTurn={false}/>
                }
            }));
        }

        return toRender;
    }


    renderInitiativeOrder = list => {
        // Shift member list into initiative list, discarding anyone without an initiative
        let tempInitiativeOrder = [];
        list.forEach(i => {
            if (i.initiative != null) {tempInitiativeOrder.push(i);}
        })

        // Sort initiative order
        // Note: multiply initiative by 1 to force JS to convert them to numbers during the comparison
        tempInitiativeOrder.sort((a, b) => (a.initiative*1 < b.initiative*1) ? 1 : -1); 
        
        let requireRefresh = false;
        if (this.state.initiativeOrder.length !== tempInitiativeOrder.length) {requireRefresh = true;}
        else {
            for (let i = 0; i < tempInitiativeOrder.length; i++){
                if (this.state.initiativeOrder[i] !== tempInitiativeOrder[i]){
                    requireRefresh = true;
                    break;
                }
            }
        }
        if (requireRefresh){
            this.setState({initiativeOrder : tempInitiativeOrder});
        }

        // Render list into TimelineCard React Components
        let toRender = []

        for (let i = 0; i < this.state.iterations; i++) {
            toRender.push(<div className={styles.Separator}></div>)
            toRender.push(this.state.initiativeOrder.map(i => {
                return <TimelineCard member={i} onChange={this.handleInitiativeChange}/>
            }))
        }

        return toRender;
    }

    generateRound(){
        let newRound = [];

        this.state.initiativeOrder.forEach(i => {
            newRound.push(i);
        })

        return newRound;
    }

    toggleAutoRound = () => {

        // Toggled on
        if (!this.state.autoRound){
            this.setState({autoRound: true});
        }

        // Toggled off
        else {
            this.setState({autoRound: false});
        }
    }

    toggleActive = () => {
       
        // Toggled game on
        if (!this.state.gameActive){
            // Try to generate a new round
            let newRound = this.generateRound();

            // If the new round is still empty (nobody has any initiative scores), turn the game back off
            if (newRound.length > 0){
                this.setState({currentRound: newRound, gameActive: true});
            } else {
                this.setState({gameActive: false});
                alert("No initiatives have been entered!");
            }
        }

        // Toggled game off
        else {
            this.setState({currentRound: [], gameActive: false});
        }
    }

    nextTurn = () => {
        let updatedRound = [];

        for (let i = 1; i < this.state.currentRound.length; i++){
            updatedRound.push(this.state.currentRound[i]);
        }

        this.setState({currentRound : updatedRound});
    }
}

export default TimelineView;