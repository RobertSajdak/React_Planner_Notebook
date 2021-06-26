import React, {Component} from "react";

import Countdown from "./Countdown.jsx";

class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            events: [
                {id: 0, name: "pobudka", time: "06:30"},
                {id: 1, name: "trening", time: "06:45"},
                {id: 2, name: "śniadanie", time: "07:30"}
            ]
        };
    }
    render() { // Generowanie komponentu na podstawie stanu.
        const events = this.state.events.map(el => {
            return <Countdown name={el.name} time={el.time}/>
        })
        return <div>{events}</div>
    }
}

export default App;