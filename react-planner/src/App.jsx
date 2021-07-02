import React, {Component} from "react";
import uniqid from "uniqid";

import "./App.css";
import Countdown from "./Countdown.jsx";
import EditEvent from "./EditEvent.jsx";

class App extends Component { // Wywołanie komponentu stanu.
    constructor() {
        super();
        this.state = {
            now: { // Pobranie aktualnego czasu.
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            },
            events: [],
            editedEvent: { // Pole do edycji wartości formularza.
                id: uniqid(), // Dodanie unikatowego ID.
                name: "",
                hour: -1,
                minute: -1
            }
        };

        this.timer = this.timer.bind(this);
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
    }

    timer() { // Funkcja, która robi update aktualnego stanu.
        this.setState({
            now: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }
        });
    }

    componentDidMount() {
        // Przypisz do stałej storageEvents wartość z localStorage.getItem("events").
        // Jeśli jej nie znajdziesz, użyj pustej tablicy.
        const storageEvents = JSON.parse(localStorage.getItem("events")) || [];
        this.setState({ events: storageEvents });

        const intervalId = setInterval(this.timer, 1000);
        this.setState({intervalId: intervalId});
    }

    componentDidUnmount() {
        clearInterval(this.state.intervalId);
    }

    // JSON Server & Fetch.
    // W katalogu, gdzie jest plik db.json, wykonujemy następujące polecenie: json-server --watch db.json
    // Pobranie wszystkich danych z bazy i wyświetlenie ich w konsoli:
    // const API = "http://localhost:3005";
    //     componentDidMount() {
    //     fetch("http://localhost:3005/countdown")
    //         .then(res => res.json())
    //         .then(data => {
    //             this.setState({
    //                 events: data
    //             })
    //         })
    // }

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
                if (editedEventExists) {
                    updatedEvents = prevState.events.map(el => {
                        if (el.id === prevState.editedEvent.id) return prevState.editedEvent
                        else return el;
                    });
                } else {
                    updatedEvents = [...prevState.events, prevState.editedEvent];
                }
                return {
                    events: updatedEvents,
                    editedEvent: {id: uniqid(), name: "", hour: -1, minute: -1}
                };
            }, () => localStorage.setItem("events", JSON.stringify(this.state.events))
        );

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
        this.setState(
            prevState => ({
                events: prevState.events.filter(el => el.id !== id)
            }),
            () => localStorage.setItem("events", JSON.stringify(this.state.events))
        );
    }

    handleEditInit(id) { // Funkcja do rozpoczęcia zmian edycji wydarzenia.
        this.setState(prevState => ({
            editedEvent: {...prevState.events.find(el => el.id === id)}
        }));
    }

    handleEditCancel() { // Funkcja do resetu zawartości pól formularza.
        this.setState({
            editedEvent: {id: uniqid(), name: "", hour: -1, minute: -1}
        });
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
                    timeNow={this.state.now}
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
                    onCancel={() => this.handleEditCancel()}
                />
            </div>
        );
    }
}

export default App;