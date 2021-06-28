import React, {Component} from "react";
import uniqid from "uniqid";

import "./App.css";
import Countdown from "./Countdown.jsx";
import EditEvent from "./EditEvent.jsx";

class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            events: [
                {id: 0, name: "pobudka", hour:"06", minute:"30"},
                {id: 1, name: "trening", hour:"06", minute:"45"},
                {id: 2, name: "śniadanie", hour:"07", minute:"30"},
            ],
            editedEvent: { // Pole do edycji wartości formularza.
                id: uniqid(), // Dodanie unikatowego ID.
                name: "",
                hour: "",
                minute: ""
            }
        };

        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
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
        this.setState(prevState => {
            const editedEventExists = prevState.events.find(
                el => el.id === prevState.editedEvent.id
            );
            let updatedEvents;
            if(editedEventExists) {
                updatedEvents = prevState.events.map(el => {
                    if(el.id === prevState.editedEvent.id) return prevState.editedEvent
                    else return el;
                });
            }
        });
        // this.setState(prevState => ({
        //     events: [...prevState.events, prevState.editedEvent],
        //     editedEvent: { // Reset pola dodawania
        //         id: uniqid(), // Dodanie unikatowego ID.
        //         name: "",
        //         hour: "",
        //         minute: ""
        //     }
        // }));
    }

    handleRemoveEvent(id) { // Funkcja do usuwania wydarzeń z listy.
        this.setState(prevState => ({
            events: prevState.events.filter(el => el.id !== id)
        }))
    }

    handleEditInit(id) { // Funkcja do rozpoczęcia zmian edycji wydarzenia.
        this.setState(prevState => ({
            editedEvent: { ...prevState.events.find(el => el.id === id) }
        }));
    }

    render() { // Generowanie komponentu na podstawie stanu.
        const events = this.state.events.map(el => {
            return (
                <Countdown
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    hour={el.hour}
                    minute={el.minute}
                    onRemove={id => this.handleRemoveEvent(id)}
                    onEditInit={id => this.handleEditInit(id)}
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