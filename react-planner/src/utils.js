// Funkcja sprawdzająca, czy wprowadzone dane w polu hour i minute formularza to cyfra.
// Jeśli nie jest to cyfra, blokowane jest wyświetlanie w polu formularza.
export function isValidNumberInput(e) {
    if (isNaN(parseInt(e.key, 10)) === true) return e.preventDefault();
    return true;
}

export function parseInputAsNumber(val) {
    if (val === "") return -1;
    return parseInt(val, 10);
}

export function isValidName(val) {
    if(val.length > 0) return true;
    return false;
}

export function isValidHour(val) {
    if(val >=0 && val <=23) return true;
    return false;
}

export function isValidMinute(val) {
    if(val >=0 && val <=59) return true;
    return false;
}