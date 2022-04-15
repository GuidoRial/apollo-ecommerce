import "./App.css";
import { client } from "./index";
import { Component } from "react";
import {
    getItems,
    getAllProducts,
    getItemsByCategory,
    getCategories,
    getCurrencies,
    getItemsById,
} from "./queries";

class App extends Component {
    constructor() {
        super();

        const testFunction = async () => {
            const result = await client
                .query({
                    query: getItemsByCategory,
                    variables: {
                        title: "clothes",
                    },
                })
                .then((result) => console.log(result.data));
        };

        testFunction();
    }

    render() {
        return <div className="App"></div>;
    }
}

export default App;
