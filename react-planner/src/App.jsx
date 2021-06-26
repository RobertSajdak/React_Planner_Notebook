import React from "react";

import Countdown from "./Countdown.jsx";

const App = () => (
    <div>
        <Countdown name="pobudka" time="06:30"/>
        <Countdown name="śniadanie" time="07:00"/>
    </div>
);

export default App;