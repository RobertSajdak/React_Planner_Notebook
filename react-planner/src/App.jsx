import React, {Component} from "react";

import "./App.css";
import Countdown from "./Countdown.jsx";
import EditEvent from "./EditEvent.jsx";

// JSON Server & Fetch.
// W katalogu, gdzie jest plik db.json, wykonujemy następujące polecenie: json-server --watch db.json
// Pobranie wszystkich danych z bazy i wyświetlenie ich w konsoli:
const API = "http://localhost:3000";

fetch(`${API}/db`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });


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
            return <Countdown key={el.id} name={el.name} time={el.time}/>
        });
        return (
            <div className="app">
                {events}
                <EditEvent />
            </div>
        );
    }
}

export default App;