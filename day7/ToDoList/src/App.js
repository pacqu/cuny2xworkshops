import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      name:"",
      listOfNames: [],
      listOfDone: [],
      listOfFavorites: []
    }
  }
  handleChange(event){
    const name = event.target.value;
    this.setState({
      name: name
    })
  }
  handleSubmit(event){
    event.preventDefault();
    const name = this.state.name;
    if (name){
    let updatedListOfNames = this.state.listOfNames;
    updatedListOfNames.push(name);
    this.setState({
      listOfNames:updatedListOfNames
    })
    }
    this.refs.name.value = "";
  }
  render() {
    const listOfNames = this.state.listOfNames;
    const listOfDone = this.state.listOfDone;
    const listOfFavorites = this.state.listOfFavorites;
    const name = listOfNames.map((name,i) =>
    {function handleClick(event){
      event.preventDefault();
      if (listOfFavorites.findIndex(function(el){ return el === event.target.innerHTML}) !== -1){
      listOfFavorites.splice(listOfFavorites.findIndex(function(el){ return el === event.target.innerHTML}),1)
    }
      else{
      listOfFavorites.push(event.currentTarget.innerHTML);
    }
    }
    function handleCheck(event){
      event.preventDefault();
      //Remove from favorite if it exists
      var inFave = listOfFavorites.findIndex(function(el){
        return el === listOfNames[i];
      });
      if (inFave !== -1)
      listOfFavorites.splice(inFave,1);
      listOfDone.push(listOfNames.splice(i,1)[0]);
      //console.log(listOfNames)
    }
    return (<div key = {i}>
      <input type="checkBox" onClick={handleCheck}/>
      <span onClick={handleClick}>{name}</span>
      </div>);
  });
  const done = listOfDone.map((name,i) => {
    function handleClick(event){
      console.log("huh");
      event.preventDefault();
      listOfDone.splice(i,1);
    }
  return (<div key = {i} onClick={handleClick}><span style={{backgroundColor: "rgba(255,43,94,1)"}}>{name}</span></div>)
});
  const favorites = listOfFavorites.map((name,i) =>
  (<div  key = {i}><span style={{backgroundColor: "rgba(255,196,94,1)"}}>{name}</span></div>));
  return(
      <div className="App">
      <div id="container">
      <div id="head">
      <h3> To-Do List </h3>
      <p>Write in Input a Task to Complete</p>
      <form>
      <label>
      <input onChange={this.handleChange.bind(this)} type="text" name="name" ref="name"/>
      </label>
      <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
      </form>
      </div>
      <div id="todone">
      <div className="listTitle">
      <h5> Done </h5>
      <h6>Click on a Done Item to Delete It</h6>
      </div>
      {(done) ? done : null}
      </div>
      <div id="todo">
      <div className="listTitle">
      <h5> To-Do </h5>
      <h6>Click on an item to favorite/unfavorite it <br/> Check off an item to mark it done</h6>
      </div>
      {(name) ? name : null}
      </div>
      <div id="tofavorite">
      <div className="listTitle">
      <h5> Favorites </h5>
      </div>
      {(favorites) ? favorites : null}
      </div>
      </div>
      </div>
    )
  }
}

export default App;
