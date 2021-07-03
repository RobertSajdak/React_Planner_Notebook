import React, { useState } from "react";
import "./EditEvent.css";
import PropTypes from "prop-types";

import {
    isValidNumberInput,
    parseInputAsNumber,
    isValidName,
    isValidHour,
    isValidMinute
} from "./utils";

// Dodanie komponentów edycji wydarzenia:
const EditEvent = props => {
    const [form, setForm] = useState({
        name: "",
        hour: "",
        minute: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const isFormValid =
        isValidName(form.name) &&
        isValidHour(form.hour) &&
        isValidMinute(form.minute);

    const isFormEmpty =
        form.name === "" && form.hour === -1 && form.minute === -1;

    const onSave = () => {
        props.onSave(form)
    }

    return (
        <div className="edit-event">
            <div className="edit-event__input-group">
                <label htmlFor="name">name : </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="hour">hour : </label>
                <input
                    type="tel"
                    id="hour"
                    name="hour"
                    value={form.hour}
                    onKeyPress={e => isValidNumberInput(e)} // Blokowanie możliwości wpisywania znaków do pola formularza.
                    onChange={handleChange}
                />
            </div>
            <div className="edit-event__input-group">
                <label htmlFor="minute">minute : </label>
                <input
                    type="tel"
                    id="minute"
                    name="minute"
                    value={form.minute}
                    onKeyPress={e => isValidNumberInput(e)}
                    onChange={handleChange}
                />
            </div>
            {/*
               Jeśli form jest OK, isFormValid true,
               Jeśli form nie jest OK, isFormValid false
               Przycisk OK odblokowany - false,
               Przycisk OK zablokowany - true.
            */}
            <button disabled={!isFormValid} onClick={onSave}>
                OK
            </button>
            <button disabled={isFormEmpty} onClick={() => setForm({
                name: "",
                hour: "",
                minute: ""
            })}>
                Cancel
            </button>
        </div>
    );
};

EditEvent.propTypes = {
    name: PropTypes.string.isRequired,
    hour: PropTypes.number,
    minute: PropTypes.number,
    onInputChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
}

export default EditEvent;