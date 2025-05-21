import { useState } from "react";


export const Quiz = () => {
    const questions = [
        'What is your favorite city?',
        'What is your favorite food?',
        'What is your favorite drink?',
        'What is your favorite sport?',
        'What is your favorite car?',
        'What is your favorite pet?'
    ];

    const [counter, setCounter] = useState(0);
    return (
        <>
            {counter === 0 &&
                <div>
                    <h1> {questions[0]}
                    </h1>
                </div>}
            {counter === 1 &&
                <div>
                    <h1> {questions[1]}
                    </h1>
                </div>}
            {counter === 2 &&
                <div>
                    <h1> {questions[2]}
                    </h1>
                </div>}

            <button onClick={() => setCounter(counter + 1)}>Continue</button>
        </>
    )
}
