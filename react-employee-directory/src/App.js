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
        console.log(response);
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
    window.location.reload(true);
  };

  render() {
    return (
      <>
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
        <table style={{ marginLeft: "32%" }}>
          {this.state.people.map((person) => (
            <tr key={person.email}>
              <td>{person.name.title}</td>
              <td>{person.name.first}</td>
              <td>{person.name.last}</td>
              <td>{person.location.country}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
}
