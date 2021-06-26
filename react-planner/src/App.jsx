import React, {Component} from "react";

import "./App.css";
import Countdown from "./Countdown.jsx";
import EditEvent from "./EditEvent.jsx";

// JSON Server & Fetch.
// W katalogu, gdzie jest plik db.json, wykonujemy następujące polecenie: json-server --watch db.json
// Pobranie wszystkich danych z bazy i wyświetlenie ich w konsoli:
// const API = "http://localhost:3000";
//
// fetch(`${API}/db`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.log(error);
//     });


class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            events: [
                {id: 1, name: "pobudka", hour: "06", minute: "30"},
                {id: 2, name: "trening", hour: "06", minute: "45"},
                {id: 3, name: "śniadanie", hour: "07", minute: "00"}
            ],
            editedEvent: { // Pole do edycji wartości formularza.
                id: 4,
                name: "",
                hour: "",
                minute: ""
            }
        };

        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
    }

    handleEditEvent(val) { // Funkcja do edycji wydarzenia.
        // this.setState({editedEvents: val});
        this.setState(prevState => {
            return {
                editedEvent: Object.assign(prevState.editedEvent, val)
            };
        });
    }

    handleSaveEvent() { // Funkcja do dodawania (zapisywania) wydarzenia do listy.
        this.setState(prevState => ({
            events: [...prevState.events, prevState.editedEvent]
        }))
    }

    render() { // Generowanie komponentu na podstawie stanu.
        const events = this.state.events.map(el => {
            return (
                <Countdown
                    key={el.id}
                    name={el.name}
                    hour={el.hour}
                    minute={el.minute}
                />
            );
        });
        return (
            <div className="app">
                {events}
                <EditEvent
                    onInputChange={val => this.handleEditEvent(val)}
                    onSave={() => this.handleSaveEvent()}
                />
            </div>
        );
    }
}

export default App;