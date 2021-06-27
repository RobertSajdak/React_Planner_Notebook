import React, {Component} from "react";
import uniqid from "uniqid";

import "./App.css";
import Countdown from "./Countdown.jsx";
import EditEvent from "./EditEvent.jsx";

class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            events: [],
            editedEvent: { // Pole do edycji wartości formularza.
                id: uniqid(), // Dodanie unikatowego ID.
                name: "",
                hour: "",
                minute: ""
            }
        };

        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
    }
    // JSON Server & Fetch.
    // W katalogu, gdzie jest plik db.json, wykonujemy następujące polecenie: json-server --watch db.json
    // Pobranie wszystkich danych z bazy i wyświetlenie ich w konsoli:
    // const API = "http://localhost:3005";
        componentDidMount() {
        fetch("http://localhost:3005/countdown")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    events: data
                })
            })
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
            events: [...prevState.events, prevState.editedEvent],
            editedEvent: { // Reset pola dodawania
                id: uniqid(), // Dodanie unikatowego ID.
                name: "",
                hour: "",
                minute: ""
            }
        }));
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
                    name={this.state.editedEvent.name}
                    hour={this.state.editedEvent.hour}
                    minute={this.state.editedEvent.minute}
                    onInputChange={val => this.handleEditEvent(val)}
                    onSave={() => this.handleSaveEvent()}
                />
            </div>
        );
    }
}

export default App;