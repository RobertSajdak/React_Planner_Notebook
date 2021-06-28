import React from "react";
import "./EditEvent.css";
import PropTypes from "prop-types";

import {isValidNumberInput} from "./utils";

// Dodanie komponentów edycji wydarzenia:
const EditEvent = props => {
    return (
        <div className="edit-event">
            <div className="edit-event__input-group">
                <label htmlFor="name">name : </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={props.name}
                    onChange={(e) =>
                        props.onInputChange({[e.target.name]: e.target.value})
                    }
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="hour">hour : </label>
                <input
                    type="tel"
                    id="hour"
                    name="hour"
                    value={props.hour === -1 ? "" : props.hour}
                    onKeyPress={e => isValidNumberInput(e)} // Blokowanie możłiwości wpisywania znaków do pola formularza.
                    onChange={(e) =>
                        props.onInputChange({[e.target.name]: e.target.value})
                    }
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="minute">minute : </label>
                <input
                    type="tel"
                    id="minute"
                    name="minute"
                    value={props.minute === -1 ? "" : props.minute}
                    onChange={(e) =>
                        props.onInputChange({[e.target.name]: e.target.value})
                    }
                />
            </div>
            <button onClick={() => props.onSave()}>OK</button>
            <button>Cancel</button>
        </div>
    );
};

EditEvent.propTypes = {
    name: PropTypes.string.isRequired,
    hour: PropTypes.number,
    minute: PropTypes.number,
    onInputChange: PropTypes.func,
    onSave: PropTypes.func
}

export default EditEvent;