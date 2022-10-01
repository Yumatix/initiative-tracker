import './CSS/App.css';
import EncounterMember from './EnounterMember.js';
import TimelineView from "./TimelineView.js";
import MemberListView from "./MemberListView.js";
import TopBar from "./TopBar.js";
import NewMemberWindow from "./NewMemberWindow.js";
import StatusInventoryView from './StatusInventoryView';
import StatusEditWindow from './StatusEditWindow';
import StatusManager from './StatusManager';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


class App extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      memberList: [], // Array of EncounterMember objects
      addMemberWindowVisible: false,
      targetStatus: [], // [statusId, memberIndex]. Used to populate the status editor window
      statusEditWindowPos: [] // [clientX, clientY] target coords for statusEditWindow. Note: these are the coords for where the user clicked/pressed. The window itself will internally adjust these coords to ensure it fits. 
    }

    this.SM = new StatusManager();
    this.SM.loadDefaultStatuses("/icons/rf/");

    // manually fill the member list for testing
    this.state.memberList.push(new EncounterMember(0, "test0", 12));
    this.state.memberList.push(new EncounterMember(1, "test1", 10));
    this.state.memberList.push(new EncounterMember(2, "test2", 8));
  }

  handleInitiativeChange = (newInitiative, memberIndex) => {
    let tempMemberList = [];
    this.state.memberList.forEach(e => {
      tempMemberList.push(e);
    })

    tempMemberList[memberIndex].initiative = newInitiative;
    this.setState({memberList : tempMemberList});
  }

  clearAllInitiatives = () => {
    let tempMemberList = [];
    this.state.memberList.forEach(e => {
      tempMemberList.push(e);
    })

    tempMemberList.forEach(e => {
      e.initiative = null;
    })
    this.setState({memberList : tempMemberList});
  }

  newEncounterMember = (name, initiative) => {
    let newInitiative = ((initiative === "") ? null : initiative);
    this.state.memberList.push(new EncounterMember(this.state.memberList.length, name, newInitiative));
  }

  setShowNewMemberWindow = (newStatus) => {
    if (newStatus) {this.setState({addMemberWindowVisible: true})}
    else {this.setState({addMemberWindowVisible: false})}
  } 

  deleteEncounterMember = (memberIndex) => {
    let newList = [];
    this.state.memberList.forEach(e => {
      newList.push(e);
    });

    // Update encounter member indices
    newList.splice(memberIndex, 1);
    for (let i = 0; i < newList.length; i++){
      newList[i].index = i;
    }

    this.setState({memberList : newList});
  }

  renderNewMemberWindow = () => {
    if (this.state.addMemberWindowVisible === true){
      return(
        <NewMemberWindow onAddMember={this.newEncounterMember} setWindowVisible={this.setShowNewMemberWindow}/>
      );
    }
    else {return null;} 
  }

  onTurnStart = (startingMemberIndex) => {

  }

  onTurnEnd = (endingMemberIndex) => {
    this.state.memberList[endingMemberIndex].onTurnEnd();

    //Update the memberList state to force a re-render of member statuses
    this.manualUpdate();
  }

  onRoundEnd = () => {

  }

  populateStatusEditWindow = (statusId, memberIndex, windowPos) => {
    this.setState({
      targetStatus : [statusId, memberIndex],
      statusEditWindowPos : windowPos
    });
  }

  getStatusData = (statusId, memberIndex) => {
    // No status ID passed
    if (statusId == null) {return;}

    // Getting status not tied to an EncounterMember
    if (memberIndex == null) {
      return {status: this.SM.getStatusTemplate(statusId), timeout: ""};
    }

    // Getting status tied to encounter member
    if (this.state.memberList[memberIndex] !== 'undefined'){
      return this.state.memberList[memberIndex].getStatusById(statusId);
    } else {
      console.log("member index doesn't exist: " + memberIndex);
    }
  }

  clearTargetStatus = () => {
    this.setState({targetStatus: []});
  }

  manualUpdate = () => {
    let newMemberList = [];
    this.state.memberList.forEach(e => {newMemberList.push(e)});
    this.setState({memberList : newMemberList});
  }

  handleOnDragEnd = (result) => {
    console.log(result);

    // If dragging from the inventory
    if (result.source.droppableId === "statusInventory"){

      // If dropping somewhere valid other than the status inventory
      if (result.destination != null){
        let dest = result.destination.droppableId;
        if(dest !== null && dest !== "statusInventory") {

          // Add status to destination's member
          let newMemberList = [];
          this.state.memberList.forEach(e => {newMemberList.push(e)});

          let targetMemberId = result.destination.droppableId;
          let targetMemberIndex = targetMemberId.charAt(targetMemberId.length - 1)*1;

          let targetListId = -1;
          switch(targetMemberId.charAt(0)){
            case 's': targetListId = 0; break;
            case 'g': targetListId = 1; break;
            case 'e': targetListId = 2; break;
            default: targetListId = -1; break;
          }

          let newStatus = newMemberList[targetMemberIndex].addStatus(this.SM.createStatus(result.draggableId, true), targetListId, "");
          console.log("Created status with ID: " + newStatus[0] + " on member: " + newStatus[1] + " in target list: " + targetListId);


          this.setState({memberList : newMemberList})
      }}
    }

    // If dragging from a member status list
    else {
      if (result.destination == null || result.destination.droppableId !== result.source.droppableId){
        //Remove status from source member
        let newMemberList = [];
        this.state.memberList.forEach(e => {newMemberList.push(e)});

        let sourceMemberId = result.source.droppableId;
        let sourceMemberIndex = sourceMemberId.charAt(sourceMemberId.length - 1)*1;
        let toRemoveId = result.draggableId.split("_")[0];

        newMemberList[sourceMemberIndex].removeStatuses([toRemoveId]);
      }
    }
  }

  render(){
    return (
      <div className="App">
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          {this.state.addMemberWindowVisible ? <NewMemberWindow onAddMember={this.newEncounterMember} setWindowVisible={this.setShowNewMemberWindow}/> : null}

          <div className = "TopBar">
            
            <TopBar onClearInitiative={this.clearAllInitiatives} setNewMemberWindowVisible={this.setShowNewMemberWindow}/>
          </div>

          <div className = "MainView">
            <div className="TimelineContainer">
              <TimelineView 
                memberList={this.state.memberList} 
                onInitiativeChange={this.handleInitiativeChange}
                onTurnStart={this.onTurnStart}
                onTurnEnd={this.onTurnEnd}
                onRoundEnd={this.onRoundEnd}
                onStatusClicked={this.populateStatusEditWindow}
              />
            </div>

            <div className="MemberListContainer">
              <MemberListView 
                memberList={this.state.memberList} 
                onInitiativeChange={this.handleInitiativeChange} 
                onDeleteMember={this.deleteEncounterMember}
                onStatusClicked={this.populateStatusEditWindow}
                />
            </div>
          </div>

          <div className = "BottomBar">
            <StatusInventoryView onStatusClicked={this.populateStatusEditWindow} statusManager={this.SM}/>
          </div>
        </DragDropContext>
        <StatusEditWindow 
          targetStatus={this.state.targetStatus}
          statusData={this.getStatusData(this.state.targetStatus[0], this.state.targetStatus[1])}
          windowPos={this.state.statusEditWindowPos}
          key={this.state.targetStatus[0]}
          clearTargetStatus={this.clearTargetStatus}
          manualUpdate={this.manualUpdate}
        />
      </div>
    );
  }
}

export default App;
