// Funkcja sprawdzająca, czy wprowadzone dane w polu formularza to cyfra.
// Jeśli nie jest to cyfra, blokowane jest wyświetlanie w polu formularza.
export function isValidNumberInput(e) {
    if (isNaN(parseInt(e.key, 10)) === true) return e.preventDefault();
    return true;
}