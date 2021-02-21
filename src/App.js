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
        this.setState({ people: response.results, total: response.results }); 
        
      });
  }

  handleFilterClick = (term) =>{
    let search_Term = term.toLowerCase()

    switch(search_Term) {
      case "first":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a,b) => a.name.first.localeCompare(b.name.first)),
          ...this.state
        });
        break;
      case "last":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a,b) => a.name.last.localeCompare(b.name.last)),
          ...this.state
        });
        break;
        case "title":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a,b) => a.name.title.localeCompare(b.name.title)),
          ...this.state
        });
        break;
        case "country":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a,b) => a.location.country.localeCompare(b.location.country)),
          ...this.state
        });
        break;
        case "email":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a,b) => a.email.localeCompare(b.email)),
          ...this.state
        });
        break;
      default:
        
    }

  }
  componentWillUnmount() {
    console.log("About to unmount");
  }

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleSearchClick = () => {
    const genders = this.state.people
    console.log(genders)
    let genderEntered = this.state.search
    console.log(genderEntered)
    const filteredGenders = genders.filter(item => item.gender === genderEntered);
    console.log(filteredGenders)
    this.setState({ people: filteredGenders });
    

  };

  
  handleResetClick = () => {
    window.location.reload(true);
  };

  render() {
    return (
      <div className= "content">
        <h1 style={{color: "white"}}>Employee Directory</h1>
        <input
          type="text"
          value={this.state.search}
          placeholder={"Type male or female here"}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearchClick}>
          Filter by male or female
        </button>
        <br></br>
        <br></br>
        <button type="button" onClick={this.handleResetClick}>
          Refresh Page
        </button>
        <br></br>
                <h3 style={{color: "white"}}>Sort by clicking any table header.</h3>
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
