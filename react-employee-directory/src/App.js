import React, { Component } from "react";

import "./App.css";

export default class App extends Component {
  state = {
    people: [],
    total: [],
    keys: ["Title", "First", "Last", "Country", "Email"],
    search: "",
  };

  componentDidMount() {
    const data = fetch("https://randomuser.me/api/?results=10");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results, total: response.resus });
        console.log(response);
      });
  }

  handleFilterClick = (term) =>{
    let search_Term = term.toLowerCase()
    let names = ["first", "title", "last"]
    if(names.includes(search_Term)){
    this.setState({
      sorted: true,
      people: this.state.people.sort((a,b) => a["name"][search_Term].localeCompare(b["name"][search_Term])),
      ...this.state
    })
  }
  }
  componentWillUnmount() {
    console.log("About to unmount");
  }

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleSearchClick = () => {
    const search = this.state.search;
    const data = fetch(`https://randomuser.me/api/?gender=${search}`);
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  };
  handleResetClick = () => {
    window.location.reload(true);
  };

  render() {
    return (
      <div class= "content">
        <h1>Employee Directory</h1>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearchClick}>
          Search Male or Female
        </button>
        <br></br>
        <br></br>
        <button type="button" onClick={this.handleResetClick}>
          Refresh Page
        </button>
        <br></br>
        <br></br>
        <table className="table" >
          <thead style={{color: "white"}}> 
              {this.state.keys.map((key, index) =>{
                return <th key={index} onClick={() => this.handleFilterClick(key)}>{key}</th>
              })}
            </thead>
            <tbody>
            {this.state.people.map((person) => (
              <tr key={person.email}>
                <td>{person.name.title}</td>
                <td>{person.name.first}</td>
                <td>{person.name.last}</td>
                <td>{person.location.country}</td>
                <td>{person.email}</td>
              </tr>
            ))}
          </tbody>
        
      </table>
      </div>
    );
  }
}
