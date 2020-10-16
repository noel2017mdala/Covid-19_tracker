import React, { Component } from "react";
import "./file.css";
//import '../img/'
let typingTimer;
let doneTypingInterval = 2000;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      flag: "",
      list: "",
      msg: "",
      status: false,
    };
  }
  searchData = (param) => {
    let url = `https://corona.lmao.ninja/v2/countries/${param}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          this.setState({ status: true });
          return res.json();
        } else {
          this.setState({ status: this.state.status });
        }
      })
      .then((data) => {
        this.setState({ list: data });
        this.setState({ flag: data.countryInfo.flag });
      })
      .catch((error) => {
        this.setState({ status: false });
        this.setState({ msg: "Please enter a valid country" });
      });
  };
  userInput = (e) => {
    this.setState({ list: "" });
    this.setState({ search: e.target.value });
    clearTimeout(typingTimer);
    typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
  };

  userKeyDown = () => {
    clearTimeout(typingTimer);
  };

  doneTyping = () => {
    //console.log(`you searched for ${this.state.search}`);
    this.searchData(this.state.search);
  };

  render() {
    let { list, flag } = this.state;
    const main = {
      paddingTop: 10,
      //backgroundColor: "black",
      //backgroundImage: "url(../img/covid.svg)",
    };

    const style = {
      height: 550,
      width: "30%",
      backgroundColor: "white",
      boxShadow: "0px 0px 5px #666",
      margin: "0 auto",
      textAlign: "center",
      fontSize: 17,
      fontWeight: "normal",
      paddingTop: 20,
      borderRadius: 20,
    };

    const input = {
      margin: 10,
      padding: 7,
    };
    const inputSyle = {
      padding: 20,
      margin: "10 auto",
      textAlign: "center",
    };
    return (
      <div className="test">
        <h1>Covid-19 Tracker</h1>
        <p>{`Searching for: ${this.state.search}`}</p>
        <div style={inputSyle}>
          <input
            style={input}
            className="input"
            type="text"
            placeholder="search"
            onKeyUp={this.userInput}
            onKeyDown={this.userKeyDown}
          />
        </div>

        <div style={main}>
          {this.state.status ? (
            <div style={style}>
              <div>
                <img src={`${flag}`} alt={list.country} />
              </div>
              <h3 className="country">{list.country}</h3>
              <p>{`Total 
                  confirmed Cases: ${list.cases}`}</p>
              <p>{`Total recovered cases: ${list.recovered}`}</p>
              <p>{`Those in critical condition: ${list.critical}`}</p>
              <p>{`New cases in the last 24 hrs: ${list.todayCases}`}</p>
              <p>{`New Deaths in the last 24 hrs: ${list.todayDeaths}`}</p>
              <p>{`Total deaths: ${list.deaths}`}</p>
              <p>{`Active cases: ${list.cases - list.recovered}`}</p>
              <p>{}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Search;
