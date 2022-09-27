import './CSS/App.css';
import EncounterMember from './EnounterMember.js';
import TimelineView from "./TimelineView.js";
import MemberListView from "./MemberListView.js";
import TopBar from "./TopBar.js";
import NewMemberWindow from "./NewMemberWindow.js";
import React from 'react';


class App extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      memberList: [],
      initiativeOrder: [],
      addMemberWindowVisible: false
    }

    // manually fill the member list for testing
    /*this.state.memberList.push(new EncounterMember(0, "test0", 12));
    this.state.memberList.push(new EncounterMember(1, "test1"));
    this.state.memberList.push(new EncounterMember(2, "test2"));
    this.state.memberList.push(new EncounterMember(3, "test3", 3));
    this.state.memberList.push(new EncounterMember(4, "test4"));*/
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
    this.state.memberList.push(new EncounterMember(this.state.memberList.length, name, initiative));
  }

  setShowNewMemberWindow = (newStatus) => {
    if (newStatus) {this.setState({addMemberWindowVisible: true})}
    else {this.setState({addMemberWindowVisible: false})}
  } 

  renderNewMemberWindow = () => {
    if (this.state.addMemberWindowVisible === true){
      return(
        <NewMemberWindow onAddMember={this.newEncounterMember} setWindowVisible={this.setShowNewMemberWindow}/>
      );
    }
    else {return null;} 
  }

  render(){
    return (
      <div className="App">
  
        {this.state.addMemberWindowVisible ? <NewMemberWindow onAddMember={this.newEncounterMember} setWindowVisible={this.setShowNewMemberWindow}/> : null}

        <div className = "TopBar">
          
          <TopBar onClearInitiative={this.clearAllInitiatives} setNewMemberWindowVisible={this.setShowNewMemberWindow}/>
        </div>
  
        <div className = "MainView">
          <div className="TimelineContainer">
            <TimelineView memberList={this.state.memberList} onInitiativeChange={this.handleInitiativeChange}/>
          </div>
  
          <div className="MemberListContainer">
            <MemberListView memberList={this.state.memberList} onInitiativeChange={this.handleInitiativeChange}/>
          </div>
        </div>
  
        <div className = "BottomBar">
  
        </div>
      
        
      </div>
    );
  }
}

export default App;
