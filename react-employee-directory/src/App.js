import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    people: [],
    search: "",
  };

  componentDidMount() {
    const data = fetch("https://randomuser.me/api/?results=10");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
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
    const data = fetch("https://randomuser.me/api/?results=10");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({ people: response.results });
      });
  };

  render() {
    return (
      <div className="body">
        <div className="App">
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
          <button type="button" onClick={this.handleResetClick}>
            Reset
          </button>
          {this.state.people.map((person) => (
            <h1 key={person.email}>{person.email}</h1>
          ))}
        </div>
      </div>
    );
  }
}
