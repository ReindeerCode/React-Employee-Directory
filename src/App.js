import React, { Component, Fragment } from "react";
import {
  MDBBtn,
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBIcon,
} from "mdbreact";
import "./App.css";

export default class App extends Component {
  state = {
    people: [],
    filteredPeople: [],
    keys: ["Title", "First", "Last", "Country", "Email"],
    search: "",
    reset: () => undefined,
  };

  componentDidMount() {
    const data = fetch("https://randomuser.me/api/?results=10");
    data
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          people: response.results,
          filteredPeople: response.results,
        });
      });
  }

  handleResetClick = () => {
    const filteredGenders = [...this.state.people];
    console.log(filteredGenders);

    this.setState({ filteredPeople: this.state.people });
  };

  handleSortClick = (term) => {
    let search_Term = term.toLowerCase();

    switch (search_Term) {
      case "first":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a, b) =>
            a.name.first.localeCompare(b.name.first)
          ),
          filteredPeople: this.state.filteredPeople.sort((a, b) =>
            a.name.first.localeCompare(b.name.first)
          ),
          ...this.state,
        });
        break;
      case "last":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a, b) =>
            a.name.last.localeCompare(b.name.last)
          ),
          filteredPeople: this.state.filteredPeople.sort((a, b) =>
            a.name.last.localeCompare(b.name.last)
          ),
          ...this.state,
        });
        break;
      case "title":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a, b) =>
            a.name.title.localeCompare(b.name.title)
          ),
          filteredPeople: this.state.filteredPeople.sort((a, b) =>
            a.name.title.localeCompare(b.name.title)
          ),
          ...this.state,
        });
        break;
      case "country":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a, b) =>
            a.location.country.localeCompare(b.location.country)
          ),
          filteredPeople: this.state.filteredPeople.sort((a, b) =>
            a.location.country.localeCompare(b.location.country)
          ),
          ...this.state,
        });
        break;
      case "email":
        this.setState({
          sorted: true,
          people: this.state.people.sort((a, b) =>
            a.email.localeCompare(b.email)
          ),
          filteredPeople: this.state.filteredPeople.sort((a, b) =>
            a.email.localeCompare(b.email)
          ),
          ...this.state,
        });
        break;
      default:
    }
  };
  componentWillUnmount() {
    console.log("About to unmount");
  }

  handleInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleMaleFilterClick = () => {
    const filteredGenders = [...this.state.people];
    const males = filteredGenders.filter(
      (filteredGenders) => filteredGenders.gender === "male"
    );

    this.setState({ filteredPeople: males });
  };

  handleFemaleFilterClick = () => {
    const filteredGenders = [...this.state.people];
    const females = filteredGenders.filter(
      (filteredGenders) => filteredGenders.gender === "female"
    );
    this.setState({ filteredPeople: females });
  };

  render() {
    return (
      <div className="content">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBJumbotron style={{ padding: 0 }}>
                <MDBCol
                  className="text-white text-center py-5 px-4 my-5"
                  style={{
                    backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)`,
                  }}
                >
                  <MDBCol className="py-1">
                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                      Employee Directory
                    </MDBCardTitle>
                    <h5 className="mx-5 mb-5">
                      Sort by clicking any table header and filter with the
                      following buttons.
                    </h5>
                  </MDBCol>
                </MDBCol>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Fragment>
          <MDBBtn onClick={this.handleMaleFilterClick}>
            Filter to Males Only
          </MDBBtn>
          <MDBBtn color="secondary" onClick={this.handleFemaleFilterClick}>
            Filter to Females Only
          </MDBBtn>
          <MDBBtn onClick={this.handleResetClick} color="info">
            Reset Table
          </MDBBtn>
        </Fragment>

        <table className="table">
          <thead style={{ color: "white" }}>
            {this.state.keys.map((key, index) => {
              return (
                <th key={index} onClick={() => this.handleSortClick(key)}>
                  {key}
                </th>
              );
            })}
          </thead>
          <tbody>
            {this.state.filteredPeople.map((person) => (
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
