import React, {Component} from "react";

import Countdown from "./Countdown.jsx";

class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            events: [
                {id: 0, name: "pobudka", time: "06:30"},
                {id: 1, name: "śniadanie", time: "07:00"}
            ]
        }
    }
    render() {
        return (
            <div>
                <Countdown name="pobudka" time="06:30"/>
                <Countdown name="śniadanie" time="07:00"/>
            </div>
        )
    }
}

export default App;