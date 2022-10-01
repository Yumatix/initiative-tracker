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
            autoRound: true
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
                        Auto Round
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

        if (this.state.currentRound.length <= 0 && this.state.gameActive === true){
            
            // Auto generate new round when current round ends        
            if (this.state.autoRound){
                let newRound = this.generateRound();
                this.setState({currentRound : newRound});
                this.onTurnStart(newRound[0]);
                this.onRoundEnd();
            } 
            // Automatically set "active" to off when the round ends, if auto is turned off
            else {
                this.setState({gameActive: false});
                this.onRoundEnd();
            }
        } 


        

        if(this.state.currentRound.length > 0){
            toRender.push(this.state.currentRound.map(i => {
                if (!myTurnMarked) {
                    myTurnMarked = true;
                    return <TimelineCard member={i} myTurn={true} onStatusClicked={this.onStatusClicked} iteration={0}/>
                } 
                else {
                    return <TimelineCard member={i} myTurn={false} onStatusClicked={this.onStatusClicked} iteration={0}/>
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
            toRender.push(this.state.initiativeOrder.map(m => {
                let hasGoneYet = false;
                this.state.currentRound.forEach(roundMember => {
                    if (roundMember.index === m.index){
                        hasGoneYet = true;
                    }
                })


                return <TimelineCard member={m} onChange={this.handleInitiativeChange} onStatusClicked={this.onStatusClicked} iteration={hasGoneYet ? i+1 : i}/>
            }))
        }

        return toRender;
    }

    onStatusClicked = (statusId, memberIndex, windowPos) => {
        this.props.onStatusClicked(statusId, memberIndex, windowPos)
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

        // Call onTurnEnd event
        this.onTurnEnd(this.state.currentRound[0]);

        // Remove current turn member, shifting all the other members in the round down an index
        let updatedRound = [];
        for (let i = 1; i < this.state.currentRound.length; i++){
            updatedRound.push(this.state.currentRound[i]);
        }
        this.setState({currentRound : updatedRound});

        // Call onTurnStart event
        if (updatedRound.length > 0) {this.onTurnStart(updatedRound[0]);
        }
    }


    // NOTE: These event handlers simply pass-through to the higher up, App level event handlers. 
    onTurnStart = (startingMember) => {
    }

    onTurnEnd = (endingMember) => {
        this.props.onTurnEnd(endingMember.index);
    }

    onRoundEnd = () => {
    }
}

export default TimelineView;