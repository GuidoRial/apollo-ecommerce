import "./App.css";
import { client } from "./index";
import { gql } from "@apollo/client";
import { Component } from "react";

class App extends Component {
    constructor() {
        super();
        
        client
            .query({
                query: gql``,
            })
            .then((result) => console.log(result.data));
    }
    render() {
        return <div className="App"></div>;
    }
}

export default App;
