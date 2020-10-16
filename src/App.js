import React, { Component } from "react";
import Search from "./Components/search";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default App;
