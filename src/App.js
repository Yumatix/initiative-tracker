import './CSS/App.css';
import EncounterMember from './EnounterMember.js';
import TimelineView from "./TimelineView.js";
import MemberListView from "./MemberListView.js";
import TopBar from "./TopBar.js";
import NewMemberWindow from "./NewMemberWindow.js";
import StatusInventoryView from './StatusInventoryView';
import StatusManager from './StatusManager';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


class App extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      memberList: [],
      initiativeOrder: [],
      addMemberWindowVisible: false
    }

    this.SM = new StatusManager();
    this.SM.loadDefaultStatuses("/icons/rf/");

    // manually fill the member list for testing
    this.state.memberList.push(new EncounterMember(0, "test0", 12));
    this.state.memberList.push(new EncounterMember(1, "test1"));
    this.state.memberList.push(new EncounterMember(2, "test2"));
    this.state.memberList.push(new EncounterMember(3, "test3", 3));
    this.state.memberList.push(new EncounterMember(4, "test4"));
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

          // TODO: this is kinda gross.. should maybe at least move it into a function since we reuse it later
          let targetListId = -1;
          switch(targetMemberId.charAt(0)){
            case 's': targetListId = 0; break;
            case 'g': targetListId = 1; break;
            case 'e': targetListId = 2; break;
            default: targetListId = -1; break;
          }

          newMemberList[targetMemberIndex].addStatus(this.SM.createStatus(result.draggableId, true), targetListId);

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

        let targetListId = -1;
          switch(sourceMemberId.charAt(0)){
            case 's': targetListId = 0; break;
            case 'g': targetListId = 1; break;
            case 'e': targetListId = 2; break;
            default: targetListId = -1; break;
          }

        newMemberList[sourceMemberIndex].removeStatus(toRemoveId, targetListId);
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
              <TimelineView memberList={this.state.memberList} onInitiativeChange={this.handleInitiativeChange}/>
            </div>

            <div className="MemberListContainer">
              <MemberListView memberList={this.state.memberList} onInitiativeChange={this.handleInitiativeChange} onDeleteMember={this.deleteEncounterMember}/>
            </div>
          </div>

          <div className = "BottomBar">
            <StatusInventoryView statusManager={this.SM}/>
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export default App;
